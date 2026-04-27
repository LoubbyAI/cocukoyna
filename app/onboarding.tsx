import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fraunces_400Regular, Fraunces_500Medium, Fraunces_600SemiBold, useFonts } from '@expo-google-fonts/fraunces';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GrainOverlay } from '../components/GrainOverlay';
import { useAktivite } from '../context/AktiviteContext';
import { YAS_GRUPLARI, type YasGrubu } from '../data/aktiviteler';
import { useStrings } from '../i18n';
import * as Haptics from 'expo-haptics';

const { height: SCREEN_H } = Dimensions.get('window');

const BG = {
  s1: require('../assets/onboarding/bg_s1.png'),
  s2: require('../assets/onboarding/bg_s2.png'),
  s3: require('../assets/onboarding/bg_s3.png'),
  s4: require('../assets/onboarding/bg_s4.png'),
};

const TABI = {
  selam: require('../assets/tabi/tabi-1-selam.png'),
  zipla: require('../assets/tabi/tabi-3-zipla.png'),
  kutla: require('../assets/tabi/tabi-5-kutla.png'),
};

const YAS_CHIP_DATA = [
  { id: '0-1' as YasGrubu, range: '0–1', label: 'Baby' },
  { id: '1-2' as YasGrubu, range: '1–2', label: 'Toddler' },
  { id: '2-3' as YasGrubu, range: '2–3', label: 'Curious' },
  { id: '3-5' as YasGrubu, range: '3–5', label: 'Creative' },
  { id: '5-7' as YasGrubu, range: '5–7', label: 'Energetic' },
  { id: '7-9' as YasGrubu, range: '7–9', label: 'Explorer' },
];

export default function OnboardingEkrani() {
  const [fontsLoaded] = useFonts({ Fraunces_400Regular, Fraunces_500Medium, Fraunces_600SemiBold });
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { yasSecimi } = useAktivite();
  const S = useStrings();
  const [ekran, setEkran] = useState(1);
  const [secilenYas, setSecilenYas] = useState<YasGrubu | null>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  if (!fontsLoaded) return null;

  const bgMap = [BG.s1, BG.s1, BG.s2, BG.s3, BG.s4];

  function sonrakiEkran(hedef: number) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 130, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    setTimeout(() => setEkran(hedef), 130);
  }

  async function tamamla() {
    if (!secilenYas) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    yasSecimi(secilenYas);
    await AsyncStorage.setItem('onboarding_done', 'true');
    router.replace('/(tabs)/');
  }

  const chipData = YAS_CHIP_DATA.map(c => ({
    ...c,
    label: S.yas_label[c.id]?.alt ?? c.label,
    range: S.yas_label[c.id]?.baslik?.split(' ')[0] ?? c.range,
  }));

  const yasInfo = secilenYas ? YAS_GRUPLARI.find(y => y.id === secilenYas) : null;
  const secilenChip = secilenYas ? YAS_CHIP_DATA.find(c => c.id === secilenYas) : null;

  return (
    <ImageBackground
      source={bgMap[ekran]}
      style={styles.kaplama}
      resizeMode="cover"
    >
      <GrainOverlay opacity={0.05} />

      <Animated.View style={[StyleSheet.absoluteFill, { opacity: fadeAnim }]}>

        {/* ── EKRAN 1 — WELCOME ── */}
        {ekran === 1 && (
          <View style={[StyleSheet.absoluteFill, { paddingTop: insets.top }]}>
            {/* Logo */}
            <Text style={styles.logo}>tabi</Text>

            {/* Bottom scrim */}
            <LinearGradient
              colors={['transparent', 'rgba(100,30,5,0.30)']}
              style={styles.bottomScrim}
            />

            {/* Text block */}
            <View style={[styles.s1TextBlock, { bottom: 220 + insets.bottom }]}>
              <Text style={styles.s1Headline}>{S.onb_s1_headline}</Text>
              <Text style={styles.s1Sub}>{S.onb_s1_sub}</Text>
            </View>

            {/* Dots */}
            <View style={[styles.dotsRow, { bottom: 140 + insets.bottom }]}>
              {[1,2,3,4].map(n => (
                <View key={n} style={[styles.dot, ekran === n && styles.dotOn]} />
              ))}
            </View>

            {/* Button */}
            <TouchableOpacity
              style={[styles.s1Btn, { bottom: 56 + insets.bottom }]}
              onPress={() => sonrakiEkran(2)}
              activeOpacity={0.85}
            >
              <Text style={styles.s1BtnYazi}>{S.onb_s1_btn}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── EKRAN 2 — STATS ── */}
        {ekran === 2 && (
          <View style={[StyleSheet.absoluteFill, { paddingTop: insets.top }]}>
            {/* Top scrim */}
            <LinearGradient
              colors={['rgba(80,20,0,0.22)', 'transparent']}
              style={styles.topScrim}
            />
            {/* Bottom scrim */}
            <LinearGradient
              colors={['transparent', 'rgba(100,30,5,0.32)']}
              style={styles.bottomScrim}
            />

            <View style={styles.s2Inner}>
              <Text style={styles.s2Headline}>{S.onb_s2_headline}</Text>

              {/* Flexible space — arka planda Tabi var */}
              <View style={styles.flex1} />

              <Text style={styles.s2Sub}>{S.onb_s2_sub}</Text>
              <Text style={styles.s2Meta}>{S.onb_s2_meta}</Text>
              <Text style={styles.microcopy}>{S.onb_s2_microcopy}</Text>

              <View style={styles.dotsRowInner}>
                {[1,2,3,4].map(n => (
                  <View key={n} style={[styles.dot, ekran === n && styles.dotOn]} />
                ))}
              </View>

              <TouchableOpacity
                style={styles.btnWhite}
                onPress={() => sonrakiEkran(3)}
                activeOpacity={0.85}
              >
                <Text style={styles.btnWhiteYazi}>{S.onb_s2_btn}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ── EKRAN 3 — YAŞ SEÇ ── */}
        {ekran === 3 && (
          <View style={[StyleSheet.absoluteFill, { paddingTop: insets.top }]}>
            {/* Bottom scrim */}
            <LinearGradient
              colors={['transparent', 'rgba(100,30,5,0.35)']}
              style={styles.bottomScrim}
            />

            <View style={[styles.s3Inner, { paddingBottom: insets.bottom + 28 }]}>
              <Text style={styles.s3Headline}>{S.onb_s3_headline}</Text>
              <Text style={styles.s3Sub}>{S.onb_s3_sub}</Text>

              {/* Chip grid */}
              <View style={styles.chipGrid}>
                {chipData.map(c => {
                  const secili = secilenYas === c.id;
                  return (
                    <TouchableOpacity
                      key={c.id}
                      style={[styles.chip, secili && styles.chipSecili]}
                      onPress={() => {
                        Haptics.selectionAsync();
                        setSecilenYas(c.id);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.chipRange, secili && styles.chipRangeSecili]}>
                        {c.range}
                      </Text>
                      <Text style={[styles.chipLabel, secili && styles.chipLabelSecili]}>
                        {c.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={styles.microcopy}>{S.onb_s3_microcopy}</Text>

              <View style={styles.dotsRowInner}>
                {[1,2,3,4].map(n => (
                  <View key={n} style={[styles.dot, ekran === n && styles.dotOn]} />
                ))}
              </View>

              <TouchableOpacity
                style={[styles.btnWhite, !secilenYas && styles.btnPasif]}
                onPress={() => secilenYas && sonrakiEkran(4)}
                activeOpacity={0.85}
              >
                <Text style={styles.btnWhiteYazi}>{S.onb_s3_btn}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ── EKRAN 4 — HAZIR ── */}
        {ekran === 4 && (
          <View style={[StyleSheet.absoluteFill, { paddingTop: insets.top }]}>
            {/* Bottom scrim */}
            <LinearGradient
              colors={['transparent', 'rgba(100,30,5,0.32)']}
              style={styles.bottomScrim}
            />

            {/* Flexible space — arka planda Tabi var */}
            <View style={styles.flex1} />

            <View style={[styles.s4Bottom, { paddingBottom: insets.bottom + 28 }]}>
              <Text style={styles.s4Headline}>{S.onb_s4_headline}</Text>

              {secilenChip && (
                <View style={styles.ageBadge}>
                  <Text style={styles.ageBadgeText}>
                    {S.onb_s4_age_text(secilenChip.range, S.yas_label[secilenChip.id]?.alt ?? secilenChip.label)}
                  </Text>
                </View>
              )}

              <Text style={styles.s4Sub}>{S.onb_s4_sub}</Text>
              <Text style={[styles.microcopy, { textAlign: 'center', marginBottom: 16 }]}>
                {S.onb_s4_microcopy}
              </Text>

              <View style={[styles.dotsRowInner, { marginBottom: 20 }]}>
                {[1,2,3,4].map(n => (
                  <View key={n} style={[styles.dot, ekran === n && styles.dotOn]} />
                ))}
              </View>

              <TouchableOpacity onPress={tamamla} activeOpacity={0.85} style={styles.btnGoldWrap}>
                <LinearGradient
                  colors={['#FFD76A', '#FFB800']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.btnGold}
                >
                  <Text style={styles.btnGoldYazi}>{S.onb_s4_btn}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}

      </Animated.View>
    </ImageBackground>
  );
}

const HEADLINE_FONT = 'Fraunces_600SemiBold';

const styles = StyleSheet.create({
  kaplama: {
    flex: 1,
    backgroundColor: '#FF6B35',
  },
  flex1: { flex: 1 },

  // Logo
  logo: {
    position: 'absolute',
    top: 80,
    left: 24,
    fontSize: 20,
    fontFamily: HEADLINE_FONT,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.92)',
    letterSpacing: 0.8,
    zIndex: 10,
    textShadowColor: 'rgba(255,210,140,0.55)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },

  // Scrims
  bottomScrim: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    height: 420,
    zIndex: 1,
  },
  topScrim: {
    position: 'absolute',
    left: 0, right: 0, top: 0,
    height: 200,
    zIndex: 1,
  },

  // Dots
  dotsRow: {
    position: 'absolute',
    left: 0, right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    zIndex: 10,
  },
  dotsRowInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.32)',
  },
  dotOn: {
    width: 22,
    backgroundColor: 'white',
  },

  // ── Screen 1 ──
  s1TextBlock: {
    position: 'absolute',
    left: 24, right: 24,
    alignItems: 'center',
    zIndex: 10,
  },
  s1Headline: {
    fontFamily: HEADLINE_FONT,
    fontSize: 40,
    fontWeight: '600',
    color: '#FFF4E6',
    lineHeight: 46,
    letterSpacing: -0.5,
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.22)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 14,
  },
  s1Sub: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255,224,194,0.68)',
    textAlign: 'center',
    lineHeight: 24,
  },
  s1Btn: {
    position: 'absolute',
    left: 24, right: 24,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  s1BtnYazi: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF7A3D',
    letterSpacing: 0.3,
  },

  // ── Screen 2 ──
  s2Inner: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 56,
    zIndex: 5,
  },
  s2Headline: {
    fontFamily: HEADLINE_FONT,
    fontSize: 30,
    fontWeight: '500',
    color: '#FFF8F0',
    lineHeight: 34,
    letterSpacing: -0.5,
    textAlign: 'center',
    marginBottom: 0,
  },
  s2Sub: {
    fontSize: 15,
    fontWeight: '400',
    color: 'rgba(255,224,194,0.70)',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 22,
  },
  s2Meta: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255,240,220,0.52)',
    textAlign: 'center',
    letterSpacing: 0.8,
    marginBottom: 6,
  },

  // ── Screen 3 ──
  s3Inner: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    paddingHorizontal: 24,
    paddingTop: 24,
    zIndex: 5,
  },
  s3Headline: {
    fontFamily: HEADLINE_FONT,
    fontSize: 22,
    fontWeight: '500',
    color: '#FFF4E6',
    lineHeight: 26,
    letterSpacing: -0.3,
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.22)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 14,
  },
  s3Sub: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(255,224,194,0.62)',
    textAlign: 'center',
    marginBottom: 20,
  },

  // Chip grid
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 16,
  },
  chip: {
    borderRadius: 30,
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.22)',
    opacity: 0.40,
  },
  chipSecili: {
    opacity: 1,
    backgroundColor: 'rgba(255,255,255,0.20)',
    borderColor: 'rgba(255,255,255,0.92)',
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  chipRange: {
    fontSize: 13,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  chipRangeSecili: {
    color: 'white',
  },
  chipLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    marginTop: 2,
  },
  chipLabelSecili: {
    color: 'rgba(255,255,255,0.85)',
  },

  // ── Screen 4 ──
  s4Bottom: {
    paddingHorizontal: 24,
    zIndex: 5,
  },
  s4Headline: {
    fontFamily: HEADLINE_FONT,
    fontSize: 42,
    fontWeight: '500',
    color: '#FFF8F0',
    lineHeight: 46,
    letterSpacing: -0.5,
    textAlign: 'center',
    marginBottom: 12,
  },
  ageBadge: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.28)',
    alignItems: 'center',
  },
  ageBadgeText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFF4E6',
    textAlign: 'center',
  },
  s4Sub: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255,224,194,0.65)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },

  // Microcopy (paylaşılan)
  microcopy: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255,209,163,0.75)',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.1,
  },

  // Butonlar
  btnWhite: {
    backgroundColor: 'white',
    borderRadius: 22,
    paddingVertical: 19,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 6,
  },
  btnWhiteYazi: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF5430',
    letterSpacing: 0.3,
  },
  btnGoldWrap: {
    borderRadius: 22,
    shadowColor: '#FFB800',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  btnGold: {
    borderRadius: 22,
    paddingVertical: 19,
    alignItems: 'center',
  },
  btnGoldYazi: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.3,
  },
  btnPasif: {
    opacity: 0.40,
  },
});
