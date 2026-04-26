import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AktiviteProvider } from '../context/AktiviteContext';
import { PremiumProvider } from '../context/PremiumContext';
import { LangProvider } from '../i18n';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LangProvider>
      <AktiviteProvider>
        <PremiumProvider>
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="yas-sec" options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="aktivite/[id]" options={{ animation: 'slide_from_bottom' }} />
          </Stack>
        </PremiumProvider>
      </AktiviteProvider>
      </LangProvider>
    </SafeAreaProvider>
  );
}
