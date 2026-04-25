type Renk3 = readonly [string, string, string];

export const KART_GRADIENT: Record<
  'orange' | 'pink' | 'purple' | 'green' | 'blue' | 'teal' | 'gold' | 'coral',
  Renk3
> = {
  orange: ['#FF8A65', '#FF7043', '#F4511E'],
  pink:   ['#F48FB1', '#F06292', '#C2185B'],
  purple: ['#BA9FE8', '#9B7DD4', '#6A3FBC'],
  green:  ['#81C784', '#5DBB7B', '#388E3C'],
  blue:   ['#80C8E8', '#4FA3D1', '#1976B8'],
  teal:   ['#80DEEA', '#26C6DA', '#00838F'],
  gold:   ['#FFE082', '#FFB946', '#F57C00'],
  coral:  ['#FF8A80', '#FF5252', '#C62828'],
};

export const KAT_GRADIENT: Record<string, Renk3> = {
  sanat:    ['#FF8A65', '#FF7043', '#F4511E'],
  hareket:  ['#F48FB1', '#F06292', '#C2185B'],
  zihinsel: ['#BA9FE8', '#9B7DD4', '#6A3FBC'],
  doga:     ['#81C784', '#5DBB7B', '#388E3C'],
  muzik:    ['#80C8E8', '#4FA3D1', '#1976B8'],
  dil:      ['#80DEEA', '#26C6DA', '#00838F'],
  motor:    ['#FFE082', '#FFB946', '#F57C00'],
  sosyal:   ['#FF8A80', '#FF5252', '#C62828'],
};

export const R = {
  turuncu: '#FF7043',
  turuncuAcik: '#FF9770',
  sari: '#FFB946',
  yesil: '#5DBB7B',
  mavi: '#4FA3D1',
  mor: '#9B7DD4',
  pembe: '#F06292',
  krem: '#FEFBF7',
  beyaz: '#FFFFFF',
  metin: '#2D2D2D',
  metinSoft: '#777777',
  karti: '#FFFFFF',
};

// Her kategori kendi rengiyle eşleşir
export const KART_RENK: Record<
  'orange' | 'pink' | 'purple' | 'green' | 'blue' | 'teal' | 'gold' | 'coral',
  string
> = {
  orange: '#FF7043', // sanat
  pink:   '#F06292', // hareket
  purple: '#9B7DD4', // zihinsel
  green:  '#5DBB7B', // doga
  blue:   '#4FA3D1', // muzik
  teal:   '#26C6DA', // dil
  gold:   '#FFB946', // motor
  coral:  '#FF5252', // sosyal
};

export const KART_RENK_ACIK: Record<
  'orange' | 'pink' | 'purple' | 'green' | 'blue' | 'teal' | 'gold' | 'coral',
  string
> = {
  orange: '#FFF3F0',
  pink:   '#FCE4EC',
  purple: '#F5F1FD',
  green:  '#F0FAF3',
  blue:   '#EEF6FC',
  teal:   '#E0F7FA',
  gold:   '#FFF8E1',
  coral:  '#FFEBEE',
};
