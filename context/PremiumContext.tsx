import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import {
  fetchProducts,
  finishTransaction,
  getAvailablePurchases,
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
  type Purchase,
} from 'react-native-iap';

const PREMIUM_KEY = 'cocukoyna_premium';
export const SKU_YEARLY = 'com.omer.cocukoyna.premium_yearly';
export const SKU_LIFETIME = 'com.omer.cocukoyna.premium_lifetime';

export type PremiumPlan = 'yearly' | 'lifetime';

interface PremiumContextType {
  isPremium: boolean;
  yukleniyor: boolean;
  satinAl: (plan: PremiumPlan) => Promise<void>;
  geriYukle: () => Promise<void>;
}

const PremiumContext = createContext<PremiumContextType>({
  isPremium: false,
  yukleniyor: false,
  satinAl: async () => {},
  geriYukle: async () => {},
});

export function PremiumProvider({ children }: { children: React.ReactNode }) {
  const [isPremium, setIsPremium] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(false);
  const purchaseUpdateRef = useRef<ReturnType<typeof purchaseUpdatedListener> | null>(null);
  const purchaseErrorRef = useRef<ReturnType<typeof purchaseErrorListener> | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(PREMIUM_KEY).then(v => {
      if (v === 'true') setIsPremium(true);
    });

    initConnection()
      .then(() => {
        purchaseUpdateRef.current = purchaseUpdatedListener(
          async (purchase: Purchase) => {
            if (purchase.transactionId) {
              await premiumYap();
              await finishTransaction({ purchase, isConsumable: false });
            }
          }
        );

        purchaseErrorRef.current = purchaseErrorListener(error => {
          if ((error as any).code !== 'E_USER_CANCELLED') {
            Alert.alert('Hata', 'Satın alma sırasında bir hata oluştu. Lütfen tekrar deneyin.');
          }
        });
      })
      .catch(() => {
        // IAP bağlantısı kurulamadı (simulator veya Expo Go)
      });

    return () => {
      purchaseUpdateRef.current?.remove();
      purchaseErrorRef.current?.remove();
    };
  }, []);

  async function premiumYap() {
    setIsPremium(true);
    await AsyncStorage.setItem(PREMIUM_KEY, 'true');
  }

  async function satinAl(plan: PremiumPlan) {
    setYukleniyor(true);
    try {
      if (plan === 'yearly') {
        await requestPurchase({
          type: 'subs',
          request: {
            apple: {
              sku: SKU_YEARLY,
              andDangerouslyFinishTransactionAutomatically: false,
            },
          },
        });
      } else {
        await requestPurchase({
          type: 'in-app',
          request: {
            apple: {
              sku: SKU_LIFETIME,
              andDangerouslyFinishTransactionAutomatically: false,
            },
          },
        });
      }
    } catch (error: any) {
      if (error?.code !== 'E_USER_CANCELLED') {
        Alert.alert('Hata', 'Satın alma başlatılamadı. Lütfen tekrar deneyin.');
      }
    } finally {
      setYukleniyor(false);
    }
  }

  async function geriYukle() {
    setYukleniyor(true);
    try {
      const purchases = await getAvailablePurchases();
      const aktif = purchases.find(
        p => p.productId === SKU_YEARLY || p.productId === SKU_LIFETIME
      );
      if (aktif) {
        await premiumYap();
        Alert.alert('Başarılı', 'Premium üyeliğin geri yüklendi!');
      } else {
        Alert.alert('Bulunamadı', 'Aktif bir premium satın alma bulunamadı.');
      }
    } catch {
      Alert.alert('Hata', 'Satın almalar kontrol edilemedi. Lütfen tekrar deneyin.');
    } finally {
      setYukleniyor(false);
    }
  }

  return (
    <PremiumContext.Provider value={{ isPremium, yukleniyor, satinAl, geriYukle }}>
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  return useContext(PremiumContext);
}
