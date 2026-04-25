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
import { useAktivite } from '../context/AktiviteContext';
import { YAS_GRUPLARI, type YasGrubu } from '../data/aktiviteler';
import { R } from '../constants/renkler';
import { useStrings } from '../i18n';

export default function YasSecEkrani() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { secilenYas, yasSecimi } = useAktivite();
  const [secilen, setSecilen] = useState<YasGrubu | null>(secilenYas);
  const S = useStrings();

  function kaydet() {
    if (!secilen) return;
    yasSecimi(secilen);
    router.back();
  }

  return (
    <View style={[styles.kaplama, { paddingTop: insets.top, paddingBottom: insets.bottom + 20 }]}>
      <View style={styles.icerik}>
        {/* Tabi + balon */}
        <View style={styles.tabiRow}>
          <Image source={TABI_DUSUN} style={styles.tabiImg} resizeMode="contain" />
          <View style={styles.balonKutu}>
            <Text style={styles.tabiAd}>Tabi</Text>
            <Text style={styles.balonYazi}>{S.yas_tabi_balon}</Text>
          </View>
        </View>

        {/* Yaş grid */}
        <View style={styles.yasGrid}>
          {YAS_GRUPLARI.map(y => {
            const aktif = secilen === y.id;
            const yl = S.yas_label[y.id] ?? { baslik: y.baslik, alt: y.alt };
            return (
              <TouchableOpacity
                key={y.id}
                style={[styles.yasKart, aktif && styles.yasKartAktif]}
                onPress={() => setSecilen(y.id)}
                activeOpacity={0.75}
              >
                <Text style={styles.yasEmoji}>{y.emoji}</Text>
                <Text style={[styles.yasBaslik, aktif && styles.yasBaslikAktif]}>{yl.baslik}</Text>
                <Text style={[styles.yasAlt, aktif && styles.yasAltAktif]}>{yl.alt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Kaydet butonu */}
        <TouchableOpacity
          style={[styles.buton, !secilen && styles.butonPasif]}
          onPress={kaydet}
          activeOpacity={0.85}
        >
          <Text style={styles.butonYazi}>{S.yas_kaydet}</Text>
        </TouchableOpacity>

        {/* İptal */}
        <TouchableOpacity style={styles.iptal} onPress={() => router.back()}>
          <Text style={styles.iptalYazi}>{S.yas_iptal}</Text>
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
  },
  tabiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 28,
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
    fontSize: 17,
    fontWeight: '700',
    color: R.beyaz,
  },
  yasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    flex: 1,
    alignContent: 'center',
  },
  yasKart: {
    width: '47%',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  yasKartAktif: {
    backgroundColor: R.beyaz,
    borderColor: R.beyaz,
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
  yasBaslikAktif: {
    color: R.turuncu,
  },
  yasAlt: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
    textAlign: 'center',
  },
  yasAltAktif: {
    color: R.turuncuAcik,
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
  iptal: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  iptalYazi: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.65)',
  },
});
