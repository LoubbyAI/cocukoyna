export { useLang, LangProvider } from './LangContext';
export type { Lang } from './LangContext';
export type { Strings } from './strings';

import { useLang } from './LangContext';
import type { Strings } from './strings';

export function useStrings(): Strings {
  return useLang().strings;
}

// Geriye dönük uyumluluk — screens'lerde useLang() ile alın
export { useLang as useIsRuEn };
