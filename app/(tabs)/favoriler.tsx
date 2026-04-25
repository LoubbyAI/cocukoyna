import { useRouter } from 'expo-router';
import { isEn } from '../../i18n';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const TABI_SELAM = require('../../assets/tabi/tabi-1-selam.png');
const TABI_DUSUN = require('../../assets/tabi/tabi-2-dusun.png');
import { useAktivite } from '../../context/AktiviteContext';
import { usePremium } from '../../context/PremiumContext';
import { AKTIVITELER, type Aktivite } from '../../data/aktiviteler';
import { KART_RENK, KART_RENK_ACIK, R } from '../../constants/renkler';
import { GrainOverlay } from '../../components/GrainOverlay';
import * as Haptics from 'expo-haptics';
import { useStrings } from '../../i18n';

export default function FavorilerEkrani() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { favoriler, favoriToggle } = useAktivite();
  const { isPremium } = usePremium();
  const S = useStrings();

  const favoriAktiviteler = AKTIVITELER.filter(a => favoriler.includes(a.id));

  function aktiviteAc(a: Aktivite) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (a.premium && !isPremium) {
      router.push('/ayarlar');
      return;
    }
    router.push(`/aktivite/${a.id}`);
  }

  function renderAktivite({ item }: { item: Aktivite }) {
    const renkAna = KART_RENK[item.renk];
    const renkAcik = KART_RENK_ACIK[item.renk];

    return (
      <TouchableOpacity
        style={styles.kart}
        onPress={() => aktiviteAc(item)}
        activeOpacity={0.78}
      >
        <View style={[styles.kartSolAlan, { backgroundColor: renkAcik }]}>
          <Text style={styles.emoji}>{item.emoji}</Text>
        </View>
        <View style={styles.kartIcerik}>
          <Text style={styles.kartBaslik}>{(isEn && item.baslikEn) ? item.baslikEn : item.baslik}</Text>
          <View style={styles.rozetSatir}>
            <View style={[styles.rozet, { backgroundColor: renkAcik }]}>
              <Text style={[styles.rozetYazi, { color: renkAna }]}>⏱ {item.sure} dk</Text>
            </View>
            <View style={[styles.rozet, { backgroundColor: renkAcik }]}>
              <Text style={[styles.rozetYazi, { color: renkAna }]}>
                {item.zorluk === 'kolay' ? '🟢' : item.zorluk === 'orta' ? '🟡' : '🔴'} {S.zorluk_label[item.zorluk] ?? item.zorluk}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.favButon}
          onPress={() => favoriToggle(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={{ fontSize: 22 }}>❤️</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.kaplama, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <GrainOverlay opacity={0.04} />
        <View style={styles.tabiRow}>
          <Image source={TABI_SELAM} style={styles.tabiImg} resizeMode="contain" />
          <View style={styles.tabiMetin}>
            <Text style={styles.headerBaslik}>{S.fav_baslik}</Text>
            <View style={styles.balonKutu}>
              <Text style={styles.tabiAd}>{S.det_tabi_ad}</Text>
              <Text style={styles.balonYazi}>
                {favoriAktiviteler.length > 0
                  ? S.fav_balon_var(favoriAktiviteler.length)
                  : S.fav_balon_yok}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {favoriAktiviteler.length === 0 ? (
        <View style={styles.bos}>
          <Image source={TABI_DUSUN} style={styles.tabiBosBoy} resizeMode="contain" />
          <Text style={styles.bosBaslik}>{S.fav_bos_baslik}</Text>
          <Text style={styles.bosAlt}>{S.fav_bos_alt}</Text>
          <TouchableOpacity
            style={styles.kesfetBut}
            onPress={() => router.push('/(tabs)/')}
          >
            <Text style={styles.kesfetYazi}>{S.fav_git}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favoriAktiviteler}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listeIcerik}
          renderItem={renderAktivite}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  kaplama: {
    flex: 1,
    backgroundColor: R.krem,
  },
  header: {
    backgroundColor: R.pembe,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
  },
  tabiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tabiImg: {
    width: 68,
    height: 80,
  },
  tabiMetin: {
    flex: 1,
  },
  headerBaslik: {
    fontSize: 22,
    fontWeight: '800',
    color: R.beyaz,
    marginBottom: 6,
  },
  balonKutu: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 14,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  tabiAd: {
    fontSize: 9,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  balonYazi: {
    fontSize: 13,
    fontWeight: '700',
    color: R.beyaz,
  },
  listeIcerik: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 12,
  },
  kart: {
    backgroundColor: R.beyaz,
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  kartSolAlan: {
    width: 68,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 30,
  },
  kartIcerik: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  favButon: {
    paddingRight: 16,
    paddingLeft: 8,
  },
  kartBaslik: {
    fontSize: 14,
    fontWeight: '800',
    color: R.metin,
    marginBottom: 6,
  },
  rozetSatir: {
    flexDirection: 'row',
    gap: 6,
  },
  rozet: {
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  rozetYazi: {
    fontSize: 10,
    fontWeight: '800',
  },
  bos: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  tabiBosBoy: {
    width: 120,
    height: 140,
    marginBottom: 12,
  },
  bosBaslik: {
    fontSize: 18,
    fontWeight: '800',
    color: R.metin,
    textAlign: 'center',
  },
  bosAlt: {
    fontSize: 14,
    fontWeight: '500',
    color: R.metinSoft,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  kesfetBut: {
    backgroundColor: R.turuncu,
    borderRadius: 50,
    paddingHorizontal: 28,
    paddingVertical: 14,
    marginTop: 24,
  },
  kesfetYazi: {
    fontSize: 15,
    fontWeight: '800',
    color: R.beyaz,
  },
});
