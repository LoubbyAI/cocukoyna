export type YasGrubu = '0-1' | '1-2' | '2-3' | '3-5' | '5-7' | '7-9';
export type Kategori = 'sanat' | 'hareket' | 'zihinsel' | 'doga' | 'muzik' | 'dil' | 'motor' | 'sosyal';
export type KartRenk = 'orange' | 'pink' | 'purple' | 'green' | 'blue' | 'teal' | 'gold' | 'coral';

export interface Aktivite {
  id: string;
  baslik: string;
  baslikEn?: string;
  baslikRu?: string;
  emoji: string;
  yasGrubu: YasGrubu[];
  sure: number; // dakika
  kategori: Kategori;
  malzemeler: string[];
  malzemelerEn?: string[];
  malzemelerRu?: string[];
  adimlar: string[];
  adimlarEn?: string[];
  adimlarRu?: string[];
  ipucu?: string;
  ipucuEn?: string;
  ipucuRu?: string;
  zorluk: 'kolay' | 'orta' | 'zor';
  renk: KartRenk;
  premium: boolean;
}

export const YAS_GRUPLARI: { id: YasGrubu; emoji: string; baslik: string; alt: string }[] = [
  { id: '0-1', emoji: '🍼', baslik: '0–1 yaş', alt: 'Bebek' },
  { id: '1-2', emoji: '🐣', baslik: '1–2 yaş', alt: 'Yürümeye başlayan' },
  { id: '2-3', emoji: '🌱', baslik: '2–3 yaş', alt: 'Meraklı' },
  { id: '3-5', emoji: '🎨', baslik: '3–5 yaş', alt: 'Yaratıcı' },
  { id: '5-7', emoji: '⚡', baslik: '5–7 yaş', alt: 'Enerjik' },
  { id: '7-9', emoji: '🔬', baslik: '7–9 yaş', alt: 'Kaşif' },
];

export const KATEGORILER: { id: Kategori; emoji: string; baslik: string }[] = [
  { id: 'sanat', emoji: '🎨', baslik: 'Sanat' },
  { id: 'hareket', emoji: '🏃', baslik: 'Hareket' },
  { id: 'zihinsel', emoji: '🧠', baslik: 'Zihinsel' },
  { id: 'doga', emoji: '🌿', baslik: 'Doğa' },
  { id: 'muzik', emoji: '🎵', baslik: 'Müzik' },
  { id: 'dil', emoji: '📖', baslik: 'Dil' },
  { id: 'motor', emoji: '✋', baslik: 'Motor' },
  { id: 'sosyal', emoji: '🤝', baslik: 'Sosyal' },
];
