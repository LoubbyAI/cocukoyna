import { tr, en, type Strings } from './strings';

function getDeviceLocale(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().locale.split('-')[0];
  } catch {
    return 'en';
  }
}

const deviceLocale = getDeviceLocale();

export function useStrings(): Strings {
  return deviceLocale === 'tr' ? tr : en;
}

export const isEn = deviceLocale !== 'tr';

export type { Strings };
