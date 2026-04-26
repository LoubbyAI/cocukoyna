import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { YasGrubu } from '../data/aktiviteler';

interface AktiviteContextType {
  secilenYas: YasGrubu | null;
  yasSecimi: (yas: YasGrubu) => void;
  favoriler: string[];
  favoriToggle: (id: string) => void;
  favorileMi: (id: string) => boolean;
}

const AktiviteContext = createContext<AktiviteContextType>({
  secilenYas: null,
  yasSecimi: () => {},
  favoriler: [],
  favoriToggle: () => {},
  favorileMi: () => false,
});

const FAVORI_KEY = 'cocukoyna_favoriler';
const YAS_KEY = 'cocukoyna_yas';

export function AktiviteProvider({ children }: { children: React.ReactNode }) {
  const [secilenYas, setSecilenYas] = useState<YasGrubu | null>(null);
  const [favoriler, setFavoriler] = useState<string[]>([]);

  useEffect(() => {
    yukle();
  }, []);

  async function yukle() {
    try {
      const [favJson, yasJson] = await Promise.all([
        AsyncStorage.getItem(FAVORI_KEY),
        AsyncStorage.getItem(YAS_KEY),
      ]);
      if (favJson) setFavoriler(JSON.parse(favJson));
      if (yasJson) setSecilenYas(yasJson as YasGrubu);
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

  return (
    <AktiviteContext.Provider value={{ secilenYas, yasSecimi, favoriler, favoriToggle, favorileMi }}>
      {children}
    </AktiviteContext.Provider>
  );
}

export function useAktivite() {
  return useContext(AktiviteContext);
}
