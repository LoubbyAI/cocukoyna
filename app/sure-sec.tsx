import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const TABI_DUSUN = require('../assets/tabi/tabi-2-dusun.png');
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { type Sure } from '../context/AktiviteContext';
import { useAktivite } from '../context/AktiviteContext';
import { R } from '../constants/renkler';
import { useStrings } from '../i18n';

export default function SureSecEkrani() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { secilenSure, sureSecimi } = useAktivite();
  const [secilen, setSecilen] = useState<Sure | null>(secilenSure);
  const S = useStrings();

  const SURE_SECENEKLERI: { id: Sure; emoji: string; baslik: string; alt: string }[] = [
    { id: '5',  emoji: '⚡',  baslik: S.sure_label['5'].baslik,  alt: S.sure_label['5'].alt },
    { id: '15', emoji: '☀️', baslik: S.sure_label['15'].baslik, alt: S.sure_label['15'].alt },
    { id: '30', emoji: '🌟', baslik: S.sure_label['30'].baslik, alt: S.sure_label['30'].alt },
  ];

  function devamEt() {
    if (!secilen) return;
    sureSecimi(secilen);
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/');
    }
  }

  return (
    <View style={[styles.kaplama, { paddingTop: insets.top, paddingBottom: insets.bottom + 20 }]}>
      <View style={styles.icerik}>
        {/* Tabi + balon */}
        <View style={styles.tabiRow}>
          <Image source={TABI_DUSUN} style={styles.tabiImg} resizeMode="contain" />
          <View style={styles.balonKutu}>
            <Text style={styles.tabiAd}>Tabi</Text>
            <Text style={styles.balonYazi}>{S.sure_tabi_balon}</Text>
          </View>
        </View>

        {/* Süre seçenekleri */}
        <View style={styles.sureListesi}>
          {SURE_SECENEKLERI.map(s => {
            const aktif = secilen === s.id;
            return (
              <TouchableOpacity
                key={s.id}
                style={[styles.sureKart, aktif && styles.sureKartAktif]}
                onPress={() => setSecilen(s.id)}
                activeOpacity={0.78}
              >
                <Text style={styles.sureEmoji}>{s.emoji}</Text>
                <View style={styles.sureMetin}>
                  <Text style={[styles.sureBaslik, aktif && styles.sureBaslikAktif]}>{s.baslik}</Text>
                  <Text style={[styles.sureAlt, aktif && styles.sureAltAktif]}>{s.alt}</Text>
                </View>
                {aktif && <Text style={styles.sureTik}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Devam butonu */}
        <TouchableOpacity
          style={[styles.buton, !secilen && styles.butonPasif]}
          onPress={devamEt}
          activeOpacity={0.85}
        >
          <Text style={styles.butonYazi}>{S.sure_git}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  kaplama: {
    flex: 1,
    backgroundColor: R.turuncu,
  },
  icerik: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    justifyContent: 'space-between',
  },
  tabiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 32,
  },
  tabiImg: {
    width: 90,
    height: 100,
  },
  balonKutu: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tabiAd: {
    fontSize: 11,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.65)',
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  balonYazi: {
    fontSize: 18,
    fontWeight: '700',
    color: R.beyaz,
    lineHeight: 26,
  },
  sureListesi: {
    flex: 1,
    justifyContent: 'center',
    gap: 14,
  },
  sureKart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 20,
    gap: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  sureKartAktif: {
    backgroundColor: R.beyaz,
    borderColor: R.beyaz,
  },
  sureEmoji: {
    fontSize: 32,
  },
  sureMetin: {
    flex: 1,
  },
  sureBaslik: {
    fontSize: 18,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.95)',
  },
  sureBaslikAktif: {
    color: R.turuncu,
  },
  sureAlt: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
  sureAltAktif: {
    color: R.turuncuAcik,
  },
  sureTik: {
    fontSize: 22,
    color: R.turuncu,
    fontWeight: '800',
  },
  buton: {
    backgroundColor: R.beyaz,
    borderRadius: 50,
    paddingVertical: 17,
    alignItems: 'center',
    marginTop: 16,
  },
  butonPasif: {
    opacity: 0.45,
  },
  butonYazi: {
    fontSize: 17,
    fontWeight: '800',
    color: R.turuncu,
  },
});
