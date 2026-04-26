import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { R } from '../constants/renkler';

export default function IndexEkrani() {
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem('onboarding_done').then(val => {
      if (val === 'true') {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboarding');
      }
    });
  }, []);

  // Turuncu splash — onboarding ile renk geçişi kesintisiz
  return <View style={{ flex: 1, backgroundColor: R.turuncu }} />;
}
