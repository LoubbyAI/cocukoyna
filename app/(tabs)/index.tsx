import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const TABI_OTUR = require('../../assets/tabi/tabi-4-otur.png');
const TABI_DUSUN = require('../../assets/tabi/tabi-2-dusun.png');
import { useAktivite } from '../../context/AktiviteContext';
import { usePremium } from '../../context/PremiumContext';
import { AKTIVITELER, KATEGORILER, YAS_GRUPLARI, type Aktivite, type Kategori } from '../../data/aktiviteler';
import { KAT_GRADIENT, KART_GRADIENT, KART_RENK, KART_RENK_ACIK, R } from '../../constants/renkler';
import { GrainOverlay } from '../../components/GrainOverlay';
import * as Haptics from 'expo-haptics';
import { useStrings, useLang } from '../../i18n';

const ZORLUK_RENK: Record<string, string> = {
  kolay: '#5DBB7B',
  orta: '#FFB946',
  zor: '#FF5252',
};

const ZORLUK_DOLU: Record<string, number> = { kolay: 1, orta: 2, zor: 3 };

export default function AktiviteListesi() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { secilenYas, favoriToggle, favorileMi, oynananMi } = useAktivite();
  const { isPremium } = usePremium();
  const [secilenKategori, setSecilenKategori] = useState<Kategori | null>(null);
  const S = useStrings();
  const { isRu, isEn } = useLang();

  const filtrelenmis = AKTIVITELER.filter(a => {
    if (secilenYas && !a.yasGrubu.includes(secilenYas)) return false;
    if (secilenKategori && a.kategori !== secilenKategori) return false;
    return true;
  });

  const freeUnplayed   = filtrelenmis.filter(a => !a.premium && !oynananMi(a.id));
  const freePlayed     = filtrelenmis.filter(a => !a.premium && oynananMi(a.id));
  const premiumItems   = filtrelenmis.filter(a => a.premium);
  const unplayed       = filtrelenmis.filter(a => !oynananMi(a.id));
  const played         = filtrelenmis.filter(a => oynananMi(a.id));

  const yasInfo = YAS_GRUPLARI.find(y => y.id === secilenYas);

  function aktiviteAc(a: Aktivite) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (a.premium && !isPremium) {
      router.push('/ayarlar');
      return;
    }
    router.push(`/aktivite/${a.id}`);
  }

  function renderSection(items: Aktivite[]) {
    const rows = [];
    for (let i = 0; i < items.length; i += 2) {
      rows.push(
        <View key={items[i].id} style={styles.satirlar}>
          {renderKart(items[i])}
          {items[i + 1] ? renderKart(items[i + 1]) : <View style={{ flex: 1 }} />}
        </View>
      );
    }
    return rows;
  }

  function renderKart(item: Aktivite) {
    const gradient = KART_GRADIENT[item.renk];
    const renkAna = KART_RENK[item.renk];
    const renkAcik = KART_RENK_ACIK[item.renk];
    const kilit = item.premium && !isPremium;
    const katInfo = KATEGORILER.find(k => k.id === item.kategori);
    const zorlukDolu = ZORLUK_DOLU[item.zorluk];
    const oynandi = oynananMi(item.id);

    return (
      <TouchableOpacity key={item.id} style={[styles.kart, oynandi && styles.kartOynandi]} onPress={() => aktiviteAc(item)} activeOpacity={0.82}>
        {/* 114px gradient üst alan */}
        <View style={styles.kartUst}>
          <LinearGradient
            colors={gradient}
            start={{ x: 0.15, y: 0 }}
            end={{ x: 0.85, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
          <GrainOverlay opacity={0.02} />

          {/* Favori butonu */}
          <TouchableOpacity
            style={styles.favoriBtn}
            onPress={() => favoriToggle(item.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={{ fontSize: 18 }}>{favorileMi(item.id) ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>

          {/* Oynadık rozeti */}
          {oynandi && (
            <View style={styles.oynadiRozet}>
              <Text style={styles.oynadiRozetYazi}>✓ {S.kart_oynandi}</Text>
            </View>
          )}

          {/* Büyük emoji */}
          <Text style={styles.kartEmoji}>{item.emoji}</Text>

          {/* Süre pill */}
          <View style={styles.surePill}>
            <Text style={styles.surePillYazi}>⏱ {item.sure} {S.det_dk}</Text>
          </View>

          {/* Premium kilit overlay */}
          {kilit && (
            <View style={styles.glassOverlay}>
              <Text style={{ fontSize: 26 }}>🔒</Text>
              <Text style={styles.glassPremiumYazi}>{S.kart_premium}</Text>
            </View>
          )}
        </View>

        {/* Alt içerik */}
        <View style={styles.kartAlt}>
          <Text style={styles.kartBaslik} numberOfLines={2}>{(isRu && item.baslikRu) ? item.baslikRu : (isEn && item.baslikEn) ? item.baslikEn : item.baslik}</Text>
          <View style={styles.kartFooter}>
            <View style={styles.zorlukRow}>
              {[0, 1, 2].map(i => (
                <View
                  key={i}
                  style={[
                    styles.zorlukDot,
                    {
                      backgroundColor: ZORLUK_RENK[item.zorluk],
                      opacity: i < zorlukDolu ? 1 : 0.2,
                    },
                  ]}
                />
              ))}
              <Text style={styles.zorlukLbl}>{S.zorluk_label[item.zorluk] ?? item.zorluk}</Text>
            </View>
            <View style={[styles.katMini, { backgroundColor: renkAcik }]}>
              <Text style={{ fontSize: 12 }}>{katInfo?.emoji ?? '🎯'}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.kaplama, { paddingTop: insets.top }]}>
      {/* Header wrapper — Tabi overflow efekti için */}
      <View style={styles.headerWrapper}>
        <LinearGradient
          colors={['#FF8A65', '#FF7043', '#F4511E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <GrainOverlay opacity={0.04} />
          <View style={styles.headerIcerik}>
            {/* Sol: Tabi placeholder (gerçek Tabi float olarak renderlanır) */}
            <View style={styles.tabiAv} />

            {/* Sağ: ana başlık + bilgi satırı + chipler */}
            <View style={styles.headerSag}>
              <Text style={styles.headerBaslik} numberOfLines={1} adjustsFontSizeToFit>{S.ana_baslik}</Text>
              <View style={styles.headerBilgiSatir}>
                <Text style={styles.headerBilgiYazi}>
                  {yasInfo ? `${yasInfo.emoji} ${S.yas_label[yasInfo.id]?.baslik ?? yasInfo.baslik}` : ''}
                </Text>
                <Text style={styles.headerBilgiAyrac}>·</Text>
                <Text style={styles.headerBilgiYazi}>{filtrelenmis.length} {S.ana_aktivite}</Text>
              </View>
              <View style={styles.headerChipler}>
                <TouchableOpacity style={styles.chip} onPress={() => router.push('/yas-sec')}>
                  <Text style={styles.chipYazi}>{S.ana_yas_chip}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Tabi — category bar üzerine taşar */}
        <Image source={TABI_OTUR} style={styles.tabiFloat} resizeMode="contain" />
      </View>

      {/* Kategori gradient filtre barı */}
      <View style={styles.katBar}>
        <GrainOverlay opacity={0.03} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.katBarIcerik}
        >
          {/* Tümü */}
          <TouchableOpacity
            style={[styles.katPillTumu, secilenKategori === null && styles.katPillTumuAktif]}
            onPress={() => setSecilenKategori(null)}
          >
            <Text style={[styles.katPillTumuYazi, secilenKategori === null && { color: '#444' }]}>
              {S.ana_tumu}
            </Text>
          </TouchableOpacity>

          {KATEGORILER.map(k => {
            const grad = KAT_GRADIENT[k.id] ?? ['#FF8A65', '#FF7043', '#F4511E'] as const;
            const aktif = secilenKategori === k.id;
            return (
              <TouchableOpacity
                key={k.id}
                onPress={() => setSecilenKategori(aktif ? null : k.id as Kategori)}
                activeOpacity={0.82}
                style={[styles.katPillWrapper, aktif && styles.katPillWrapperAktif]}
              >
                <LinearGradient
                  colors={grad}
                  start={{ x: 0.15, y: 0 }}
                  end={{ x: 0.85, y: 1 }}
                  style={styles.katPill}
                >
                  <Text style={{ fontSize: 14 }}>{k.emoji}</Text>
                  <Text style={styles.katPillYazi}>{S.kat_label[k.id] ?? k.baslik}</Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Aktivite listesi / boş durum */}
      {filtrelenmis.length === 0 ? (
        <View style={styles.bos}>
          <Image source={TABI_DUSUN} style={styles.bosTabi} resizeMode="contain" />
          <Text style={styles.bosBaslik}>{S.ana_bos_baslik}</Text>
          <Text style={styles.bosAlt}>{S.ana_bos_alt}</Text>
          <TouchableOpacity style={styles.bosBut} onPress={() => setSecilenKategori(null)}>
            <Text style={styles.bosButYazi}>{S.ana_filtre_temizle}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.listeIcerik}
          showsVerticalScrollIndicator={false}
        >
          {renderSection(isPremium ? unplayed : freeUnplayed)}
          {isPremium ? (
            played.length > 0 ? (
              <>
                <Text style={styles.bolumLbl}>{S.ana_bolum_oynananlar}</Text>
                {renderSection(played)}
              </>
            ) : null
          ) : (
            <>
              {freePlayed.length > 0 ? (
                <>
                  <Text style={styles.bolumLbl}>{S.ana_bolum_oynananlar}</Text>
                  {renderSection(freePlayed)}
                </>
              ) : null}
              {premiumItems.length > 0 ? (
                <>
                  <Text style={styles.bolumLbl}>{S.kart_premium}</Text>
                  {renderSection(premiumItems)}
                </>
              ) : null}
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  kaplama: {
    flex: 1,
    backgroundColor: R.krem,
  },

  // ── Header ──
  headerWrapper: {
    zIndex: 2,
    overflow: 'visible',
  },
  header: {
    shadowColor: '#F4511E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  headerIcerik: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    gap: 8,
  },
  tabiAv: {
    width: 88,
    height: 104,
  },
  tabiFloat: {
    position: 'absolute',
    bottom: -22,
    left: 12,
    width: 108,
    height: 128,
    zIndex: 10,
  },
  headerSag: {
    flex: 1,
    gap: 6,
    paddingTop: 4,
  },
  headerBaslik: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  headerBilgiSatir: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerBilgiYazi: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  headerBilgiAyrac: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  headerChipler: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  chipYazi: {
    fontSize: 11,
    fontWeight: '800',
    color: '#fff',
  },

  // ── Kategori Barı ──
  katBar: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    zIndex: 1,
  },
  katBarIcerik: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    gap: 9,
  },
  katPillTumu: {
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  katPillTumuAktif: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  katPillTumuYazi: {
    fontSize: 12,
    fontWeight: '800',
    color: '#888',
  },
  katPillWrapper: {
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 4,
    elevation: 4,
  },
  katPillWrapperAktif: {
    shadowOpacity: 0.28,
    elevation: 7,
    transform: [{ scale: 1.06 }],
  },
  katPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  katPillYazi: {
    fontSize: 12,
    fontWeight: '800',
    color: '#fff',
  },

  // ── Aktivite Kartı (v4 Claymorphism) ──
  listeIcerik: {
    paddingHorizontal: 13,
    paddingTop: 14,
    paddingBottom: 100,
  },
  bolumLbl: {
    fontSize: 10,
    fontWeight: '800',
    color: '#888',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 2,
  },
  satirlar: {
    flexDirection: 'row',
    gap: 13,
    marginBottom: 13,
  },
  kart: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255,112,67,0.18)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.11,
    shadowRadius: 20,
    elevation: 6,
  },
  kartOynandi: {
    opacity: 0.6,
    borderColor: 'rgba(76,175,80,0.25)',
  },
  oynadiRozet: {
    position: 'absolute',
    top: 8,
    left: 9,
    backgroundColor: 'rgba(76,175,80,0.88)',
    borderRadius: 50,
    paddingHorizontal: 7,
    paddingVertical: 2,
    zIndex: 3,
  },
  oynadiRozetYazi: {
    fontSize: 10,
    fontWeight: '800',
    color: '#fff',
  },
  kartUst: {
    height: 114,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kartEmoji: {
    fontSize: 54,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  favoriBtn: {
    position: 'absolute',
    top: 10,
    right: 11,
  },
  surePill: {
    position: 'absolute',
    bottom: 9,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 50,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  surePillYazi: {
    fontSize: 10,
    fontWeight: '800',
    color: '#fff',
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,5,25,0.42)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  glassPremiumYazi: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFD700',
    letterSpacing: 0.8,
  },
  kartAlt: {
    paddingTop: 11,
    paddingHorizontal: 13,
    paddingBottom: 13,
  },
  kartBaslik: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2D2D2D',
    lineHeight: 19,
    marginBottom: 9,
  },
  kartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  zorlukRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  zorlukDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  zorlukLbl: {
    fontSize: 10,
    fontWeight: '800',
    color: '#888',
    marginLeft: 4,
  },
  katMini: {
    borderRadius: 50,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },

  // ── Boş Durum ──
  bos: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    paddingBottom: 90,
  },
  bosTabi: {
    width: 120,
    height: 140,
    marginBottom: 16,
  },
  bosBaslik: {
    fontSize: 19,
    fontWeight: '800',
    color: '#2D2D2D',
    marginBottom: 6,
  },
  bosAlt: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
  bosBut: {
    marginTop: 24,
    backgroundColor: R.turuncu,
    borderRadius: 50,
    paddingHorizontal: 28,
    paddingVertical: 13,
    shadowColor: R.turuncu,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  bosButYazi: {
    fontSize: 15,
    fontWeight: '800',
    color: '#fff',
  },
});
