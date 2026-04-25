export type { YasGrubu, Kategori, KartRenk, Aktivite } from './types';
export { YAS_GRUPLARI, KATEGORILER } from './types';

import { Aktivite, YasGrubu, Kategori } from './types';
import { AKTIVITELER_0_1 } from './aktiviteler-0-1';
import { AKTIVITELER_1_2 } from './aktiviteler-1-2';
import { AKTIVITELER_2_3 } from './aktiviteler-2-3';
import { AKTIVITELER_3_5 } from './aktiviteler-3-5';
import { AKTIVITELER_5_7 } from './aktiviteler-5-7';
import { AKTIVITELER_7_9 } from './aktiviteler-7-9';

export const AKTIVITELER: Aktivite[] = [
  ...AKTIVITELER_0_1,
  ...AKTIVITELER_1_2,
  ...AKTIVITELER_2_3,
  ...AKTIVITELER_3_5,
  ...AKTIVITELER_5_7,
  ...AKTIVITELER_7_9,
];

export function aktiviteleriFiltrele(yasGrubu: YasGrubu, kategori?: Kategori, maxSure?: number): Aktivite[] {
  return AKTIVITELER.filter(a => {
    if (!a.yasGrubu.includes(yasGrubu)) return false;
    if (kategori && a.kategori !== kategori) return false;
    if (maxSure && a.sure > maxSure) return false;
    return true;
  });
}
