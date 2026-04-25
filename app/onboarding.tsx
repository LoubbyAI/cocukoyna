import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const TABI = {
  selam:  require('../assets/tabi/tabi-1-selam.png'),
  dusun:  require('../assets/tabi/tabi-2-dusun.png'),
  zipla:  require('../assets/tabi/tabi-3-zipla.png'),
  otur:   require('../assets/tabi/tabi-4-otur.png'),
  kutla:  require('../assets/tabi/tabi-5-kutla.png'),
};
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { type Sure } from '../context/AktiviteContext';
import { useAktivite } from '../context/AktiviteContext';
import { YAS_GRUPLARI, type YasGrubu } from '../data/aktiviteler';
import { R } from '../constants/renkler';
import { GrainOverlay } from '../components/GrainOverlay';
import * as Haptics from 'expo-haptics';
import { useStrings } from '../i18n';

export default function OnboardingEkrani() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { yasSecimi, sureSecimi } = useAktivite();
  const [ekran, setEkran] = useState(1);
  const [secilenYas, setSecilenYas] = useState<YasGrubu | null>(null);
  const [secilenSure, setSecilenSure] = useState<Sure | null>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const S = useStrings();

  const SURE_SECENEKLERI: { id: Sure; emoji: string; baslik: string; alt: string }[] = [
    { id: '5',  emoji: '⚡',  baslik: S.sure_label['5'].baslik,  alt: S.sure_label['5'].alt },
    { id: '15', emoji: '☀️', baslik: S.sure_label['15'].baslik, alt: S.sure_label['15'].alt },
    { id: '30', emoji: '🌟', baslik: S.sure_label['30'].baslik, alt: S.sure_label['30'].alt },
  ];

  function sonrakiEkran(hedef: number) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 140, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    setTimeout(() => setEkran(hedef), 140);
  }

  async function tamamla() {
    if (!secilenYas || !secilenSure) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    yasSecimi(secilenYas);
    sureSecimi(secilenSure);
    await AsyncStorage.setItem('onboarding_done', 'true');
    router.replace('/(tabs)/');
  }

  const yasInfo = secilenYas ? YAS_GRUPLARI.find(y => y.id === secilenYas) : null;
  const sureInfo = secilenSure ? SURE_SECENEKLERI.find(s => s.id === secilenSure) : null;

  return (
    <View style={[styles.kaplama, { paddingTop: insets.top, paddingBottom: insets.bottom + 20 }]}>
      <GrainOverlay opacity={0.04} />
      {/* Progress dots — ekran 2, 3, 4 */}
      {ekran > 1 && (
        <View style={styles.dotsRow}>
          {[2, 3, 4].map(n => (
            <View key={n} style={[styles.dot, ekran >= n && styles.dotAktif]} />
          ))}
        </View>
      )}

      <Animated.View style={[styles.icerik, { opacity: fadeAnim }]}>
        {/* EKRAN 1 — Karşılama */}
        {ekran === 1 && (
          <View style={styles.ekranKaplama}>
            <View style={styles.merkez}>
              <Image source={TABI.selam} style={styles.tabiBuyuk} resizeMode="contain" />
              <Text style={styles.e1Baslik}>{S.onb_merhaba}</Text>
              <Text style={styles.e1Ort}>{S.onb_benim_adim}</Text>
              <Text style={styles.e1Alt}>{S.onb_slogan}</Text>
            </View>
            <TouchableOpacity style={styles.butonAna} onPress={() => sonrakiEkran(2)} activeOpacity={0.85}>
              <Text style={styles.butonAnaYazi}>{S.onb_baslayalim}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* EKRAN 2 — Yaş Seçimi */}
        {ekran === 2 && (
          <View style={styles.ekranKaplama}>
            <View style={styles.tabiKucukRow}>
              <Image source={TABI.dusun} style={styles.tabiKucukImg} resizeMode="contain" />
              <View style={styles.balonKutu}>
                <Text style={styles.balonYazi}>{S.onb_kac_yas}</Text>
              </View>
            </View>

            <View style={styles.yasGrid}>
              {YAS_GRUPLARI.map(y => {
                const secili = secilenYas === y.id;
                const yl = S.yas_label[y.id] ?? { baslik: y.baslik, alt: y.alt };
                return (
                  <TouchableOpacity
                    key={y.id}
                    style={[styles.yasKart, secili && styles.yasKartSecili]}
                    onPress={() => setSecilenYas(y.id)}
                    activeOpacity={0.75}
                  >
                    <Text style={styles.yasEmoji}>{y.emoji}</Text>
                    <Text style={[styles.yasBaslik, secili && styles.yasMetinSecili]}>{yl.baslik}</Text>
                    <Text style={[styles.yasAlt, secili && styles.yasAltSecili]}>{yl.alt}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={[styles.butonAna, !secilenYas && styles.butonPasif]}
              onPress={() => secilenYas && sonrakiEkran(3)}
              activeOpacity={0.85}
            >
              <Text style={styles.butonAnaYazi}>{S.onb_devam}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* EKRAN 3 — Süre Seçimi */}
        {ekran === 3 && (
          <View style={styles.ekranKaplama}>
            <View style={styles.tabiKucukRow}>
              <Image source={TABI.dusun} style={styles.tabiKucukImg} resizeMode="contain" />
              <View style={styles.balonKutu}>
                <Text style={styles.balonYazi}>{S.onb_kac_sure}</Text>
              </View>
            </View>

            <View style={styles.sureListesi}>
              {SURE_SECENEKLERI.map(s => {
                const secili = secilenSure === s.id;
                return (
                  <TouchableOpacity
                    key={s.id}
                    style={[styles.sureKart, secili && styles.sureKartSecili]}
                    onPress={() => setSecilenSure(s.id)}
                    activeOpacity={0.78}
                  >
                    <Text style={styles.sureEmoji}>{s.emoji}</Text>
                    <View style={styles.sureMetin}>
                      <Text style={[styles.sureBaslik, secili && styles.sureMetinSecili]}>{s.baslik}</Text>
                      <Text style={[styles.sureAlt, secili && styles.sureAltSecili]}>{s.alt}</Text>
                    </View>
                    {secili && <Text style={styles.sureTik}>✓</Text>}
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={[styles.butonAna, !secilenSure && styles.butonPasif]}
              onPress={() => secilenSure && sonrakiEkran(4)}
              activeOpacity={0.85}
            >
              <Text style={styles.butonAnaYazi}>{S.onb_devam}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* EKRAN 4 — Hazır! */}
        {ekran === 4 && (
          <View style={styles.ekranKaplama}>
            <View style={styles.merkez}>
              <Image source={TABI.zipla} style={styles.tabiBuyuk} resizeMode="contain" />
              <Text style={styles.e1Baslik}>{S.onb_hazirsin}</Text>
              <View style={styles.ozet}>
                {yasInfo && (
                  <View style={styles.ozetSatir}>
                    <Text style={styles.ozetEmoji}>{yasInfo.emoji}</Text>
                    <Text style={styles.ozetYazi}>{S.onb_ozet_yas(S.yas_label[yasInfo.id]?.baslik ?? yasInfo.baslik)}</Text>
                  </View>
                )}
                {sureInfo && (
                  <View style={styles.ozetSatir}>
                    <Text style={styles.ozetEmoji}>{sureInfo.emoji}</Text>
                    <Text style={styles.ozetYazi}>{S.onb_ozet_sure(S.sure_label[sureInfo.id]?.baslik ?? sureInfo.baslik)}</Text>
                  </View>
                )}
              </View>
            </View>
            <TouchableOpacity style={styles.butonAna} onPress={tamamla} activeOpacity={0.85}>
              <Text style={styles.butonAnaYazi}>{S.onb_kesfet}</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  kaplama: {
    flex: 1,
    backgroundColor: R.turuncu,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingTop: 16,
    paddingBottom: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  dotAktif: {
    backgroundColor: R.beyaz,
    width: 22,
  },
  icerik: {
    flex: 1,
  },
  ekranKaplama: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 8,
  },

  // Merkez (Ekran 1 & 4)
  merkez: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabiBuyuk: {
    width: 320,
    height: 320,
    marginBottom: 16,
  },
  tabiKucukImg: {
    width: 180,
    height: 180,
  },
  tabiAd: {
    fontSize: 13,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  e1Baslik: {
    fontSize: 32,
    fontWeight: '800',
    color: R.beyaz,
    textAlign: 'center',
    marginBottom: 6,
  },
  e1Ort: {
    fontSize: 20,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
    marginBottom: 10,
  },
  e1Alt: {
    fontSize: 17,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 26,
  },

  // Tabi küçük + balon (Ekran 2 & 3)
  tabiKucukRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 24,
    marginTop: 8,
  },
  balonKutu: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  balonYazi: {
    fontSize: 20,
    fontWeight: '800',
    color: R.beyaz,
  },

  // Yaş grid
  yasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    flex: 1,
    alignContent: 'center',
  },
  yasKart: {
    width: '47%',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  yasKartSecili: {
    backgroundColor: R.beyaz,
    borderColor: R.beyaz,
    shadowOpacity: 0.18,
    shadowRadius: 14,
  },
  yasEmoji: {
    fontSize: 30,
    marginBottom: 6,
  },
  yasBaslik: {
    fontSize: 14,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  yasMetinSecili: {
    color: R.turuncu,
  },
  yasAlt: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.65)',
    marginTop: 2,
    textAlign: 'center',
  },
  yasAltSecili: {
    color: R.turuncuAcik,
  },

  // Süre listesi
  sureListesi: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
  },
  sureKart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  sureKartSecili: {
    backgroundColor: R.beyaz,
    borderColor: R.beyaz,
    shadowOpacity: 0.18,
    shadowRadius: 14,
  },
  sureEmoji: {
    fontSize: 30,
  },
  sureMetin: {
    flex: 1,
  },
  sureBaslik: {
    fontSize: 17,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.95)',
  },
  sureMetinSecili: {
    color: R.turuncu,
  },
  sureAlt: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.65)',
    marginTop: 2,
  },
  sureAltSecili: {
    color: R.turuncuAcik,
  },
  sureTik: {
    fontSize: 20,
    color: R.turuncu,
    fontWeight: '800',
  },

  // Özet (Ekran 4)
  ozet: {
    marginTop: 20,
    gap: 10,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 20,
    padding: 18,
  },
  ozetSatir: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ozetEmoji: {
    fontSize: 22,
  },
  ozetYazi: {
    fontSize: 15,
    fontWeight: '700',
    color: R.beyaz,
  },

  // Buton
  butonAna: {
    backgroundColor: R.beyaz,
    borderRadius: 20,
    paddingVertical: 17,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  butonPasif: {
    opacity: 0.45,
  },
  butonAnaYazi: {
    fontSize: 17,
    fontWeight: '800',
    color: R.turuncu,
  },
});
