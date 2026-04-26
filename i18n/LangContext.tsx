import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { tr, en, ru, type Strings } from './strings';

export type Lang = 'tr' | 'en' | 'ru';
const LANG_KEY = 'cocukoyna_lang';

function getDeviceLocale(): Lang {
  try {
    const raw = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[0];
    return raw === 'tr' ? 'tr' : raw === 'ru' ? 'ru' : 'en';
  } catch {
    return 'en';
  }
}

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  strings: Strings;
  isRu: boolean;
  isEn: boolean;
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  strings: en,
  isRu: false,
  isEn: true,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getDeviceLocale());

  useEffect(() => {
    AsyncStorage.getItem(LANG_KEY).then(saved => {
      if (saved === 'tr' || saved === 'en' || saved === 'ru') setLangState(saved);
    });
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    AsyncStorage.setItem(LANG_KEY, l).catch(() => {});
  }

  const strings = lang === 'tr' ? tr : lang === 'ru' ? ru : en;

  return (
    <LangContext.Provider value={{ lang, setLang, strings, isRu: lang === 'ru', isEn: lang === 'en' }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
