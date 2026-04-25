import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Image,
  Modal,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const TABI_KUTLA = require('../../assets/tabi/tabi-5-kutla.png');

const PEDAGOJI_MAP: Record<string, { emoji: string; label: string; renk: string }> = {
  sanat:    { emoji: '🎨', label: 'Waldorf İlhamlı',        renk: '#F3E8FF' },
  hareket:  { emoji: '🧠', label: 'Oyun Terapisi İlhamlı',  renk: '#E8F5E9' },
  zihinsel: { emoji: '🌱', label: 'Montessori İlhamlı',     renk: '#FFF3E0' },
  doga:     { emoji: '🌱', label: 'Montessori İlhamlı',     renk: '#FFF3E0' },
  muzik:    { emoji: '🎨', label: 'Waldorf İlhamlı',        renk: '#F3E8FF' },
  dil:      { emoji: '💬', label: 'Gelişim Odaklı',         renk: '#E3F2FD' },
  motor:    { emoji: '🌱', label: 'Montessori İlhamlı',     renk: '#FFF3E0' },
  sosyal:   { emoji: '🧠', label: 'Oyun Terapisi İlhamlı',  renk: '#E8F5E9' },
};
import { useAktivite } from '../../context/AktiviteContext';
import { AKTIVITELER } from '../../data/aktiviteler';
import { KART_GRADIENT, KART_RENK, KART_RENK_ACIK, R } from '../../constants/renkler';
import { GrainOverlay } from '../../components/GrainOverlay';
import { useStrings, isEn } from '../../i18n';

export default function AktiviteDetay() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { favoriToggle, favorileMi } = useAktivite();
  const [tamamlananAdimlar, setTamamlananAdimlar] = useState<number[]>([]);
  const [tamamlananMalzemeler, setTamamlananMalzemeler] = useState<number[]>([]);
  const [focusMod, setFocusMod] = useState(false);
  const S = useStrings();

  const aktivite = AKTIVITELER.find(a => a.id === id);

  if (!aktivite) {
    return (
      <View style={styles.hata}>
        <Text style={styles.hataYazi}>{S.det_hata}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.geriYazi}>{S.det_geri}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const gradient = KART_GRADIENT[aktivite.renk];
  const renkAna = KART_RENK[aktivite.renk];
  const renkAcik = KART_RENK_ACIK[aktivite.renk];
  const gosterBaslik = (isEn && aktivite.baslikEn) ? aktivite.baslikEn : aktivite.baslik;
  const gosterMalzemeler = (isEn && aktivite.malzemelerEn) ? aktivite.malzemelerEn : aktivite.malzemeler;
  const gosterAdimlar = (isEn && aktivite.adimlarEn) ? aktivite.adimlarEn : aktivite.adimlar;
  const gosterIpucu = (isEn && aktivite.ipucuEn) ? aktivite.ipucuEn : aktivite.ipucu;
  const tamTamamlanan = tamamlananAdimlar.length === gosterAdimlar.length;
  const pedagoji = PEDAGOJI_MAP[aktivite.kategori];

  function adimToggle(idx: number) {
    setTamamlananAdimlar(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  }

  function malzemeToggle(idx: number) {
    setTamamlananMalzemeler(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  }

  async function paylasim() {
    try {
      await Share.share({
        message: S.paylasim_aktivite(gosterBaslik),
        title: gosterBaslik,
      });
    } catch {}
  }

  return (
    <View style={[styles.kaplama, { paddingTop: insets.top }]}>
      {/* Header gradient */}
      <LinearGradient colors={gradient} start={{ x: 0.15, y: 0 }} end={{ x: 0.85, y: 1 }} style={styles.header}>
        <GrainOverlay opacity={0.04} />
        <View style={styles.headerUst}>
          <TouchableOpacity style={styles.geriBut} onPress={() => router.back()}>
            <Text style={styles.geriButYazi}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerSagButonlar}>
            <TouchableOpacity onPress={paylasim} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text style={{ fontSize: 22 }}>📤</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => favoriToggle(aktivite.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={{ fontSize: 24 }}>{favorileMi(aktivite.id) ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.buyukEmoji}>{aktivite.emoji}</Text>
        <Text style={styles.baslik}>{gosterBaslik}</Text>
      </LinearGradient>

      {/* Sticky info bar */}
      <View style={styles.infoBar}>
        <View style={styles.infoItem}>
          <Text style={styles.infoEmoji}>⏱</Text>
          <Text style={styles.infoYazi}>{aktivite.sure} dk</Text>
        </View>
        <View style={styles.infoAyrac} />
        <View style={styles.infoItem}>
          <Text style={styles.infoEmoji}>
            {aktivite.zorluk === 'kolay' ? '🟢' : aktivite.zorluk === 'orta' ? '🟡' : '🔴'}
          </Text>
          <Text style={styles.infoYazi}>{aktivite.zorluk}</Text>
        </View>
        <View style={styles.infoAyrac} />
        <View style={styles.infoItem}>
          <Text style={styles.infoEmoji}>👶</Text>
          <Text style={styles.infoYazi}>{aktivite.yasGrubu.join(', ')} {S.det_yas}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollIcerik, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Pedagoji rozeti */}
        {pedagoji && (
          <View style={styles.pedagojiSatir}>
            <View style={[styles.pedagojiRozet, { backgroundColor: pedagoji.renk }]}>
              <Text style={styles.pedagojiEmoji}>{pedagoji.emoji}</Text>
              <Text style={styles.pedagojiYazi}>{S.ped_label[aktivite.kategori] ?? pedagoji.label}</Text>
            </View>
          </View>
        )}

        {/* Malzemeler */}
        {gosterMalzemeler.length > 0 && (
          <View style={styles.bolum}>
            <Text style={styles.bolumBaslik}>{S.det_malzeme}</Text>
            <View style={styles.bolumKart}>
              {gosterMalzemeler.map((m, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.malzemeItem, i < gosterMalzemeler.length - 1 && styles.ayrac]}
                  onPress={() => malzemeToggle(i)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.check, tamamlananMalzemeler.includes(i) && { backgroundColor: renkAna, borderColor: renkAna }]}>
                    {tamamlananMalzemeler.includes(i) && <Text style={styles.checkTik}>✓</Text>}
                  </View>
                  <Text style={[styles.malzemeYazi, tamamlananMalzemeler.includes(i) && styles.ustCizili]}>{m}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Odak Modu butonu */}
        <TouchableOpacity style={[styles.focusBut, { borderColor: renkAna }]} onPress={() => setFocusMod(true)} activeOpacity={0.8}>
          <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.focusButGrad}>
            <Text style={styles.focusButYazi}>{S.det_odak_but}</Text>
            <Text style={styles.focusButAlt}>{S.det_odak_alt}</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Adımlar */}
        <View style={styles.bolum}>
          <Text style={styles.bolumBaslik}>{S.det_nasil}</Text>
          <View style={styles.bolumKart}>
            {gosterAdimlar.map((adim, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.adimItem, i < gosterAdimlar.length - 1 && styles.ayrac]}
                onPress={() => adimToggle(i)}
                activeOpacity={0.7}
              >
                <View style={[styles.adimNumara, { backgroundColor: tamamlananAdimlar.includes(i) ? renkAna : renkAcik }]}>
                  <GrainOverlay opacity={0.08} />
                  {tamamlananAdimlar.includes(i)
                    ? <Text style={[styles.adimNumaraYazi, { color: R.beyaz }]}>✓</Text>
                    : <Text style={[styles.adimNumaraYazi, { color: renkAna }]}>{i + 1}</Text>
                  }
                </View>
                <Text style={[styles.adimYazi, tamamlananAdimlar.includes(i) && styles.ustCizili]}>{adim}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tabi kutlama kutusu */}
        {tamTamamlanan && (
          <View style={[styles.tamamKutu, { borderColor: renkAna }]}>
            <Image source={TABI_KUTLA} style={styles.tamamTabi} resizeMode="contain" />
            <Text style={styles.tamamTabiAd}>{S.det_tabi_ad}</Text>
            <Text style={[styles.tamamBaslik, { color: renkAna }]}>{S.det_muhtesem}</Text>
            <Text style={styles.tamamAlt}>{S.det_tamamlandi}</Text>
          </View>
        )}

        {/* İpucu */}
        {gosterIpucu && (
          <View style={styles.bolum}>
            <Text style={styles.bolumBaslik}>{S.det_ipucu}</Text>
            <View style={[styles.ipucuKart, { borderLeftColor: renkAna }]}>
              <Text style={styles.ipucuYazi}>{gosterIpucu}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* ── Focus Mode Modal ── */}
      <Modal visible={focusMod} animationType="slide" statusBarTranslucent>
        <View style={[styles.focusKaplama, { paddingTop: insets.top }]}>
          {/* Focus header */}
          <LinearGradient colors={gradient} start={{ x: 0.15, y: 0 }} end={{ x: 0.85, y: 1 }} style={styles.focusHeader}>
            <View style={styles.focusHeaderUst}>
              <Text style={styles.focusEmoji}>{aktivite.emoji}</Text>
              <TouchableOpacity style={styles.focusKapatBut} onPress={() => setFocusMod(false)}>
                <Text style={styles.focusKapatYazi}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.focusBaslik}>{gosterBaslik}</Text>
            <Text style={styles.focusSure}>⏱ {aktivite.sure} dk • {gosterAdimlar.length} {S.det_adim}</Text>
          </LinearGradient>

          {/* Adımlar büyük */}
          <ScrollView contentContainerStyle={[styles.focusAdimlar, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
            {gosterAdimlar.map((adim, i) => {
              const tamam = tamamlananAdimlar.includes(i);
              return (
                <TouchableOpacity
                  key={i}
                  style={[styles.focusAdimItem, tamam && { backgroundColor: renkAcik }]}
                  onPress={() => adimToggle(i)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.focusAdimNo, { backgroundColor: tamam ? renkAna : renkAcik }]}>
                    {tamam
                      ? <Text style={[styles.focusAdimNoYazi, { color: '#fff' }]}>✓</Text>
                      : <Text style={[styles.focusAdimNoYazi, { color: renkAna }]}>{i + 1}</Text>
                    }
                  </View>
                  <Text style={[styles.focusAdimYazi, tamam && { color: R.metinSoft, textDecorationLine: 'line-through' }]}>
                    {adim}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {tamTamamlanan && (
              <View style={[styles.focusTamam, { backgroundColor: renkAcik, borderColor: renkAna }]}>
                <Text style={{ fontSize: 36 }}>🎉</Text>
                <Text style={[styles.focusTamamBaslik, { color: renkAna }]}>{S.det_harika}</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  kaplama: {
    flex: 1,
    backgroundColor: R.krem,
  },

  // ── Header ──
  header: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  headerUst: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    marginBottom: 8,
  },
  geriBut: {
    backgroundColor: 'rgba(255,255,255,0.28)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  geriButYazi: {
    fontSize: 20,
    color: R.beyaz,
    fontWeight: '700',
  },
  headerSagButonlar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  buyukEmoji: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 8,
  },
  baslik: {
    fontSize: 22,
    fontWeight: '800',
    color: R.beyaz,
    textAlign: 'center',
    marginBottom: 14,
    paddingHorizontal: 12,
  },
  // ── Sticky info bar ──
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF8F2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  infoEmoji: {
    fontSize: 14,
  },
  infoYazi: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3D2B1F',
    letterSpacing: 0.2,
  },
  infoAyrac: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  pedagojiSatir: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,
  },
  pedagojiRozet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pedagojiEmoji: {
    fontSize: 14,
  },
  pedagojiYazi: {
    fontSize: 12,
    fontWeight: '800',
    color: '#444',
    letterSpacing: 0.3,
  },

  // ── Scroll içeriği ──
  scrollIcerik: {
    padding: 16,
    gap: 4,
  },
  bolum: {
    marginTop: 12,
  },
  bolumBaslik: {
    fontSize: 11,
    fontWeight: '700',
    color: R.metinSoft,
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  bolumKart: {
    backgroundColor: R.beyaz,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255,112,67,0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  ayrac: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  malzemeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
    gap: 12,
  },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.13)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkTik: {
    fontSize: 12,
    color: R.beyaz,
    fontWeight: '800',
  },
  malzemeYazi: {
    fontSize: 14,
    fontWeight: '600',
    color: R.metin,
    flex: 1,
  },
  ustCizili: {
    color: R.metinSoft,
    textDecorationLine: 'line-through',
  },
  adimItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  adimNumara: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
    flexShrink: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  adimNumaraYazi: {
    fontSize: 13,
    fontWeight: '800',
  },
  adimYazi: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2D2015',
    flex: 1,
    lineHeight: 22,
    letterSpacing: 0.15,
  },

  // ── Odak Modu butonu ──
  focusBut: {
    marginTop: 16,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  focusButGrad: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  focusButYazi: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
  focusButAlt: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    marginTop: 3,
  },

  // ── Tabi kutlama ──
  tamamKutu: {
    backgroundColor: '#FFF8F5',
    borderRadius: 24,
    padding: 22,
    marginTop: 16,
    alignItems: 'center',
    borderWidth: 2,
  },
  tamamTabi: {
    width: 100,
    height: 100,
    marginBottom: 4,
  },
  tamamTabiAd: {
    fontSize: 11,
    fontWeight: '800',
    color: '#aaa',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  tamamBaslik: {
    fontSize: 22,
    fontWeight: '800',
  },
  tamamAlt: {
    fontSize: 13,
    fontWeight: '600',
    color: R.metinSoft,
    marginTop: 4,
  },

  // ── İpucu ──
  ipucuKart: {
    backgroundColor: R.beyaz,
    borderRadius: 20,
    padding: 18,
    borderLeftWidth: 4,
    borderTopWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
    borderTopColor: 'rgba(255,112,67,0.15)',
    borderRightColor: 'rgba(255,112,67,0.15)',
    borderBottomColor: 'rgba(255,112,67,0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  ipucuYazi: {
    fontSize: 14,
    fontWeight: '500',
    color: R.metin,
    lineHeight: 22,
  },

  // ── Focus Mode Modal ──
  focusKaplama: {
    flex: 1,
    backgroundColor: R.krem,
  },
  focusHeader: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  focusHeaderUst: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    marginBottom: 6,
  },
  focusEmoji: {
    fontSize: 36,
  },
  focusKapatBut: {
    backgroundColor: 'rgba(255,255,255,0.28)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusKapatYazi: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '800',
  },
  focusBaslik: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 6,
  },
  focusSure: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.8)',
  },
  focusAdimlar: {
    padding: 16,
    gap: 10,
  },
  focusAdimItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: 'rgba(255,112,67,0.12)',
  },
  focusAdimNo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  focusAdimNoYazi: {
    fontSize: 16,
    fontWeight: '800',
  },
  focusAdimYazi: {
    fontSize: 16,
    fontWeight: '600',
    color: R.metin,
    flex: 1,
    lineHeight: 24,
    marginTop: 6,
  },
  focusTamam: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    gap: 8,
  },
  focusTamamBaslik: {
    fontSize: 22,
    fontWeight: '800',
  },

  // ── Hata ──
  hata: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: R.krem,
  },
  hataYazi: {
    fontSize: 16,
    color: R.metin,
  },
  geriYazi: {
    fontSize: 14,
    color: R.turuncu,
    marginTop: 12,
    fontWeight: '700',
  },
});
