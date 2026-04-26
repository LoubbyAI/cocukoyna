import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Alert,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const TABI_OTUR = require('../../assets/tabi/tabi-4-otur.png');
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Linking } from 'react-native';
import { usePremium } from '../../context/PremiumContext';
import { R } from '../../constants/renkler';
import { GrainOverlay } from '../../components/GrainOverlay';
import { useStrings, useLang } from '../../i18n';

export default function AyarlarEkrani() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isPremium, yukleniyor, satinAl, geriYukle } = usePremium();
  const S = useStrings();
  const { lang, setLang } = useLang();

  async function onboardingSifirla() {
    await AsyncStorage.removeItem('onboarding_done');
    router.replace('/onboarding');
  }

  async function arkadasaOner() {
    try {
      await Share.share({
        message: S.paylasim_arkadasaoner,
        title: S.paylasim_baslik,
      });
    } catch {}
  }

  function gizlilikGoster() {
    Linking.openURL('https://loubbyai.github.io/cocukoyna/');
  }

  return (
    <View style={[styles.kaplama, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <GrainOverlay opacity={0.04} />
        <View style={styles.tabiRow}>
          <Image source={TABI_OTUR} style={styles.tabiImg} resizeMode="contain" />
          <View style={styles.tabiMetin}>
            <Text style={styles.headerBaslik}>{S.ayt_baslik}</Text>
            <View style={styles.balonKutu}>
              <Text style={styles.tabiAd}>{S.det_tabi_ad}</Text>
              <Text style={styles.balonYazi}>{S.ayt_tabi_balon}</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.icerik, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Premium Kart */}
        {!isPremium ? (
          <LinearGradient
            colors={['#5B2D9E', '#2D1B6E', '#1A1A2E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.premiumKart}
          >
            <View style={styles.premiumIkBas}>
              <Text style={styles.premiumEmoji}>👑</Text>
              <View>
                <Text style={styles.premiumBaslik}>{S.ayt_premium_baslik}</Text>
                <Text style={styles.premiumAlt}>{S.ayt_premium_alt}</Text>
              </View>
            </View>

            <View style={styles.premiumOzellik}>
              {S.ayt_ozellikler.map((m, i) => (
                <Text key={i} style={styles.premiumMadde}>{m}</Text>
              ))}
            </View>

            {/* Yıllık — EN POPÜLER */}
            <View style={styles.popuLabel}>
              <Text style={styles.popuLabelYazi}>{S.ayt_en_populer}</Text>
            </View>
            <TouchableOpacity
              style={[styles.satinAlYillik, yukleniyor && styles.satinaAlPasif]}
              onPress={() => satinAl('yearly')}
              disabled={yukleniyor}
            >
              <Text style={styles.satinAlYillikYazi}>
                {yukleniyor ? S.ayt_yukleniyor : S.ayt_yillik}
              </Text>
              <Text style={styles.satinAlYillikAlt}>{S.ayt_yillik_alt}</Text>
            </TouchableOpacity>

            {/* Tek Seferlik */}
            <TouchableOpacity
              style={[styles.satinAlOmur, yukleniyor && styles.satinaAlPasif]}
              onPress={() => satinAl('lifetime')}
              disabled={yukleniyor}
            >
              <Text style={styles.satinAlOmurYazi}>{S.ayt_omur}</Text>
              <Text style={styles.satinAlOmurAlt}>{S.ayt_omur_alt}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.geriYukleBut}
              onPress={geriYukle}
              disabled={yukleniyor}
            >
              <Text style={styles.geriYukleYazi}>{S.ayt_geri_yukle}</Text>
            </TouchableOpacity>

            {/* Apple zorunlu: Terms + Privacy */}
            <View style={styles.yasal}>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/')}>
                <Text style={styles.yasalLink}>{S.ayt_kosullar}</Text>
              </TouchableOpacity>
              <Text style={styles.yasalAyrac}> · </Text>
              <TouchableOpacity onPress={gizlilikGoster}>
                <Text style={styles.yasalLink}>{S.ayt_gizlilik_link}</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        ) : (
          <LinearGradient
            colors={['#5B2D9E', '#2D1B6E', '#1A1A2E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.premiumAktifKart}
          >
            <Text style={styles.premiumAktifEmoji}>👑</Text>
            <Text style={styles.premiumAktifBaslik}>{S.ayt_premium_aktif_baslik}</Text>
            <Text style={styles.premiumAktifAlt}>{S.ayt_premium_aktif_alt}</Text>
          </LinearGradient>
        )}

        {/* Dil Seçici */}
        <Text style={styles.bolumBaslik}>DİL / LANGUAGE / ЯЗЫК</Text>
        <View style={styles.dilKart}>
          {([
            { code: 'tr', flag: '🇹🇷', label: 'Türkçe' },
            { code: 'en', flag: '🇬🇧', label: 'English' },
            { code: 'ru', flag: '🇷🇺', label: 'Русский' },
          ] as const).map(({ code, flag, label }) => (
            <TouchableOpacity
              key={code}
              style={[styles.dilChip, lang === code && styles.dilChipAktif]}
              onPress={() => setLang(code)}
            >
              <Text style={styles.dilFlag}>{flag}</Text>
              <Text style={[styles.dilLabel, lang === code && styles.dilLabelAktif]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bilgi bölümü */}
        <Text style={styles.bolumBaslik}>{S.ayt_hakkinda}</Text>

        <View style={styles.karteGrup}>
          <View style={styles.satir}>
            <Text style={styles.satirIkon}>📱</Text>
            <View style={styles.satirMetin}>
              <Text style={styles.satirBaslik}>{S.ayt_surum_baslik}</Text>
              <Text style={styles.satirAlt}>1.0.0</Text>
            </View>
          </View>

          <View style={styles.ayrac} />

          <TouchableOpacity style={styles.satir} onPress={gizlilikGoster}>
            <Text style={styles.satirIkon}>🔒</Text>
            <View style={styles.satirMetin}>
              <Text style={styles.satirBaslik}>{S.ayt_gizlilik_baslik}</Text>
              <Text style={styles.satirAlt}>{S.ayt_gizlilik_alt}</Text>
            </View>
            <Text style={styles.ok}>›</Text>
          </TouchableOpacity>

          <View style={styles.ayrac} />

          <TouchableOpacity style={styles.satir} onPress={arkadasaOner}>
            <Text style={styles.satirIkon}>📤</Text>
            <View style={styles.satirMetin}>
              <Text style={styles.satirBaslik}>{S.ayt_arkadasaoner}</Text>
              <Text style={styles.satirAlt}>{S.ayt_arkadasaoner_alt}</Text>
            </View>
            <Text style={styles.ok}>›</Text>
          </TouchableOpacity>

          <View style={styles.ayrac} />

          <View style={styles.satir}>
            <Text style={styles.satirIkon}>📡</Text>
            <View style={styles.satirMetin}>
              <Text style={styles.satirBaslik}>{S.ayt_cevrimdisi}</Text>
              <Text style={styles.satirAlt}>{S.ayt_cevrimdisi_alt}</Text>
            </View>
            <View style={styles.yesildot} />
          </View>

          <View style={styles.ayrac} />

          <TouchableOpacity style={styles.satir} onPress={onboardingSifirla}>
            <Text style={styles.satirIkon}>🔄</Text>
            <View style={styles.satirMetin}>
              <Text style={styles.satirBaslik}>{S.ayt_sifirla_baslik}</Text>
              <Text style={styles.satirAlt}>{S.ayt_sifirla_alt}</Text>
            </View>
            <Text style={styles.ok}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Felsefe */}
        <Text style={styles.bolumBaslik}>{S.ayt_felsefe}</Text>
        <View style={styles.felsefKart}>
          <Text style={styles.felsefYazi}>{S.ayt_felsefe_1}</Text>
          <Text style={[styles.felsefYazi, { marginTop: 8 }]}>{S.ayt_felsefe_2}</Text>
        </View>

        {/* Debug — sadece dev'de göster */}
        {__DEV__ && !isPremium && (
          <TouchableOpacity style={styles.debugBut} onPress={() => satinAl('yearly')}>
            <Text style={styles.debugYazi}>🛠 [DEV] Premium Test (Yearly)</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  kaplama: {
    flex: 1,
    backgroundColor: R.krem,
  },
  header: {
    backgroundColor: R.mor,
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
  icerik: {
    padding: 16,
    gap: 8,
  },
  premiumKart: {
    backgroundColor: '#1A1A2E',
    borderRadius: 24,
    padding: 20,
    marginBottom: 8,
  },
  premiumIkBas: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  premiumEmoji: {
    fontSize: 40,
  },
  premiumBaslik: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFD700',
  },
  premiumAlt: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  premiumOzellik: {
    gap: 6,
    marginBottom: 20,
  },
  premiumMadde: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  popuLabel: {
    backgroundColor: '#FFD700',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  popuLabelYazi: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1A1A2E',
  },
  satinAlYillik: {
    backgroundColor: '#FFD700',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  satinAlYillikYazi: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A2E',
  },
  satinAlYillikAlt: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(26,26,46,0.7)',
    marginTop: 2,
  },
  satinAlOmur: {
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 4,
  },
  satinAlOmurYazi: {
    fontSize: 15,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
  },
  satinAlOmurAlt: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },
  satinaAlPasif: {
    opacity: 0.6,
  },
  geriYukleBut: {
    marginTop: 12,
    alignItems: 'center',
  },
  geriYukleYazi: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.5)',
  },
  yasal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  yasalLink: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.45)',
    textDecorationLine: 'underline',
  },
  yasalAyrac: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.3)',
  },
  premiumAktifKart: {
    backgroundColor: '#1A1A2E',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 8,
  },
  premiumAktifEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  premiumAktifBaslik: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFD700',
  },
  premiumAktifAlt: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  bolumBaslik: {
    fontSize: 11,
    fontWeight: '700',
    color: R.metinSoft,
    letterSpacing: 0.8,
    marginTop: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
  karteGrup: {
    backgroundColor: R.beyaz,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  satir: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  satirIkon: {
    fontSize: 22,
  },
  satirMetin: {
    flex: 1,
  },
  satirBaslik: {
    fontSize: 14,
    fontWeight: '700',
    color: R.metin,
  },
  satirAlt: {
    fontSize: 12,
    fontWeight: '500',
    color: R.metinSoft,
    marginTop: 1,
  },
  ok: {
    fontSize: 20,
    color: R.metinSoft,
  },
  ayrac: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
    marginLeft: 52,
  },
  yesildot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: R.yesil,
  },
  felsefKart: {
    backgroundColor: R.beyaz,
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  felsefYazi: {
    fontSize: 14,
    fontWeight: '500',
    color: R.metin,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  dilKart: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  dilChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: R.beyaz,
    borderRadius: 16,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  dilChipAktif: {
    backgroundColor: R.turuncu,
    borderColor: R.turuncu,
  },
  dilFlag: {
    fontSize: 18,
  },
  dilLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: R.metin,
  },
  dilLabelAktif: {
    color: R.beyaz,
  },
  debugBut: {
    backgroundColor: '#333',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  debugYazi: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});
