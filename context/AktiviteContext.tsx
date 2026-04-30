import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { YasGrubu } from '../data/aktiviteler';

interface AktiviteContextType {
  secilenYas: YasGrubu | null;
  yasSecimi: (yas: YasGrubu) => void;
  favoriler: string[];
  favoriToggle: (id: string) => void;
  favorileMi: (id: string) => boolean;
  oynananlar: string[];
  oynananToggle: (id: string) => void;
  oynananMi: (id: string) => boolean;
}

const AktiviteContext = createContext<AktiviteContextType>({
  secilenYas: null,
  yasSecimi: () => {},
  favoriler: [],
  favoriToggle: () => {},
  favorileMi: () => false,
  oynananlar: [],
  oynananToggle: () => {},
  oynananMi: () => false,
});

const FAVORI_KEY = 'cocukoyna_favoriler';
const YAS_KEY = 'cocukoyna_yas';
const OYNANDI_KEY = 'cocukoyna_oynananlar';

export function AktiviteProvider({ children }: { children: React.ReactNode }) {
  const [secilenYas, setSecilenYas] = useState<YasGrubu | null>(null);
  const [favoriler, setFavoriler] = useState<string[]>([]);
  const [oynananlar, setOynananlar] = useState<string[]>([]);

  useEffect(() => {
    yukle();
  }, []);

  async function yukle() {
    try {
      const [favJson, yasJson, oynananJson] = await Promise.all([
        AsyncStorage.getItem(FAVORI_KEY),
        AsyncStorage.getItem(YAS_KEY),
        AsyncStorage.getItem(OYNANDI_KEY),
      ]);
      if (favJson) setFavoriler(JSON.parse(favJson));
      if (yasJson) setSecilenYas(yasJson as YasGrubu);
      if (oynananJson) setOynananlar(JSON.parse(oynananJson));
    } catch {}
  }

  function yasSecimi(yas: YasGrubu) {
    setSecilenYas(yas);
    AsyncStorage.setItem(YAS_KEY, yas).catch(() => {});
  }

  async function favoriToggle(id: string) {
    const yeni = favoriler.includes(id)
      ? favoriler.filter(f => f !== id)
      : [...favoriler, id];
    setFavoriler(yeni);
    try {
      await AsyncStorage.setItem(FAVORI_KEY, JSON.stringify(yeni));
    } catch {}
  }

  function favorileMi(id: string) {
    return favoriler.includes(id);
  }

  async function oynananToggle(id: string) {
    const yeni = oynananlar.includes(id)
      ? oynananlar.filter(o => o !== id)
      : [...oynananlar, id];
    setOynananlar(yeni);
    try {
      await AsyncStorage.setItem(OYNANDI_KEY, JSON.stringify(yeni));
    } catch {}
  }

  function oynananMi(id: string) {
    return oynananlar.includes(id);
  }

  return (
    <AktiviteContext.Provider value={{ secilenYas, yasSecimi, favoriler, favoriToggle, favorileMi, oynananlar, oynananToggle, oynananMi }}>
      {children}
    </AktiviteContext.Provider>
  );
}

export function useAktivite() {
  return useContext(AktiviteContext);
}
