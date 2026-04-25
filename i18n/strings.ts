const tr = {
  // Tab bar
  tab_aktiviteler: 'Aktiviteler',
  tab_favoriler: 'Favoriler',
  tab_ayarlar: 'Ayarlar',

  // Onboarding
  onb_merhaba: 'Merhaba!',
  onb_benim_adim: 'Benim adım Tabi.',
  onb_slogan: 'Sizinle harika oyunlar\nkeşfedeceğiz',
  onb_baslayalim: 'Başlayalım →',
  onb_kac_yas: 'Çocuğunuz kaç yaşında?',
  onb_devam: 'Devam →',
  onb_kac_sure: 'Bugün ne kadar süren var?',
  onb_hazirsin: 'Hazırsın! 🎉',
  onb_ozet_yas: (yas: string) => `${yas} için aktiviteler`,
  onb_ozet_sure: (sure: string) => `${sure} süreli oyunlar`,
  onb_kesfet: 'Keşfetmeye Başla 🎯',

  // Süre etiketleri
  sure_label: {
    '5':  { baslik: '5 dakika',   alt: 'Hızlı bir oyun' },
    '15': { baslik: '15 dakika',  alt: 'Rahat bir aktivite' },
    '30': { baslik: '30 dakika+', alt: 'Uzun soluklu eğlence' },
  } as Record<string, { baslik: string; alt: string }>,

  // Yaş grup etiketleri
  yas_label: {
    '0-1': { baslik: '0–1 yaş', alt: 'Bebek' },
    '1-2': { baslik: '1–2 yaş', alt: 'Yürümeye başlayan' },
    '2-3': { baslik: '2–3 yaş', alt: 'Meraklı' },
    '3-5': { baslik: '3–5 yaş', alt: 'Yaratıcı' },
    '5-7': { baslik: '5–7 yaş', alt: 'Enerjik' },
    '7-9': { baslik: '7–9 yaş', alt: 'Kaşif' },
  } as Record<string, { baslik: string; alt: string }>,

  // Kategori etiketleri
  kat_label: {
    sanat:    'Sanat',
    hareket:  'Hareket',
    zihinsel: 'Zihinsel',
    doga:     'Doğa',
    muzik:    'Müzik',
    dil:      'Dil',
    motor:    'Motor',
    sosyal:   'Sosyal',
  } as Record<string, string>,

  // Zorluk etiketleri
  zorluk_label: {
    kolay: 'kolay',
    orta:  'orta',
    zor:   'zor',
  } as Record<string, string>,

  // Pedagoji etiketleri
  ped_label: {
    sanat:    'Waldorf İlhamlı',
    hareket:  'Oyun Terapisi İlhamlı',
    zihinsel: 'Montessori İlhamlı',
    doga:     'Montessori İlhamlı',
    muzik:    'Waldorf İlhamlı',
    dil:      'Gelişim Odaklı',
    motor:    'Montessori İlhamlı',
    sosyal:   'Oyun Terapisi İlhamlı',
  } as Record<string, string>,

  // Ana ekran
  ana_baslik: 'Bugün ne oynuyoruz? 🎯',
  ana_aktivite: 'aktivite',
  ana_yas_chip: 'Yaş ›',
  ana_tumu: '✦ Tümü',
  ana_bos_baslik: 'Hmm, farklı bir şey dene...',
  ana_bos_alt: 'Bu filtre için aktivite bulunamadı.',
  ana_filtre_temizle: 'Filtreyi temizle',
  kart_premium: 'PREMİUM',

  // Favoriler ekranı
  fav_baslik: 'Favorilerim',
  fav_balon_var: (n: number) => `${n} favori aktiviten burada! ❤️`,
  fav_balon_yok: 'Kalp ikonuna dokun, kaydet ❤️',
  fav_bos_baslik: 'Hmm, favori yok...',
  fav_bos_alt: 'Aktivitelerdeki kalp ikonuna dokunarak buraya ekle',
  fav_git: 'Aktivitelere Git',

  // Aktivite detay
  det_malzeme: '🛒 MALZEMELER',
  det_nasil: '👣 NASIL YAPILIR',
  det_ipucu: '💡 EBEVEYN İPUCU',
  det_odak_but: '🎯 Odak Modunda Oyna',
  det_odak_alt: 'Sadece adımlar — telefonu bırak!',
  det_tabi_ad: 'TABİ',
  det_muhtesem: 'Muhteşem! 🎉',
  det_tamamlandi: 'Bu aktiviteyi tamamladınız!',
  det_harika: 'Harika iş!',
  det_yas: 'yaş',
  det_adim: 'adım',
  det_hata: 'Aktivite bulunamadı',
  det_geri: '← Geri dön',

  // Süre seç ekranı
  sure_tabi_balon: 'Bugün ne kadar\nsüren var?',
  sure_git: 'Aktivitelere Git 🎯',

  // Yaş seç ekranı
  yas_tabi_balon: 'Çocuğunun kaç yaşında?',
  yas_kaydet: 'Kaydet ✓',
  yas_iptal: 'İptal',

  // Ayarlar
  ayt_baslik: 'Ayarlar',
  ayt_tabi_balon: 'Her şeyi buradan ayarlayabilirsin ⚙️',
  ayt_premium_baslik: "Premium'a Geç",
  ayt_premium_alt: '200+ aktivitenin tamamına eriş',
  ayt_ozellikler: [
    '✅ Tüm yaş grupları tam kütüphane',
    '✅ Yeni aktiviteler otomatik güncelleme',
    '✅ Reklam yok, her zaman',
    '✅ Montessori & Waldorf destekli içerik',
  ] as string[],
  ayt_en_populer: '⭐ EN POPÜLER',
  ayt_yillik: 'Yıllık — $9.99/yıl',
  ayt_yillik_alt: '$0.83/ay · İptal edilebilir',
  ayt_yukleniyor: 'Yükleniyor...',
  ayt_omur: 'Ömür Boyu — $19.99',
  ayt_omur_alt: 'Tek seferlik, sonsuza kadar',
  ayt_geri_yukle: 'Satın Almayı Geri Yükle',
  ayt_kosullar: 'Kullanım Koşulları',
  ayt_gizlilik_link: 'Gizlilik Politikası',
  ayt_premium_aktif_baslik: 'Premium Aktif!',
  ayt_premium_aktif_alt: 'Tüm aktivitelere erişimin açık',
  ayt_hakkinda: 'UYGULAMA HAKKINDA',
  ayt_surum_baslik: 'Sürüm',
  ayt_gizlilik_baslik: 'Gizlilik Politikası',
  ayt_gizlilik_alt: 'Veri toplamıyoruz',
  ayt_arkadasaoner: 'Arkadaşına Öner',
  ayt_arkadasaoner_alt: 'Paylaş ve sevdiklerini mutlu et',
  ayt_cevrimdisi: 'Çevrimdışı Çalışır',
  ayt_cevrimdisi_alt: 'İnternet bağlantısı gerekmez',
  ayt_sifirla_baslik: "Onboarding'i Sıfırla",
  ayt_sifirla_alt: 'Test için — ilk açılış ekranına dön',
  ayt_felsefe: 'FELSEFE',
  ayt_felsefe_1: 'Bu uygulama, çocuğunuzla geçireceğiniz ekransız, yaratıcı anlar için tasarlandı. Ironik ama gerçek: oyun sırasında telefonu bir kenara koyabilirsiniz.',
  ayt_felsefe_2: 'Montessori, Waldorf ve oyun terapisi kaynaklı aktiviteler, çocuğunuzun gelişimine uygun biçimde seçilmiştir.',

  // Paylaşım
  paylasim_aktivite: (baslik: string) => `"${baslik}" aktivitesini çocuğumla yaptım! 🎉\n\nSiz de deneyin 👉 Tabi uygulamasında 200+ aktivite var.\n\nhttps://cocukoyna.app`,
  paylasim_arkadasaoner: 'Tabi — Çocuğumla Ne Oynasam — 200+ pedagoji destekli aktivite!\n\nhttps://cocukoyna.app',
  paylasim_baslik: 'Tabi — Çocuğumla Ne Oynasam',

  // Gizlilik uyarısı
  gizlilik_baslik: 'Gizlilik Politikası',
  gizlilik_mesaj: 'Bu uygulama hiçbir kişisel veri toplamaz. Tüm veriler yalnızca cihazınızda saklanır. Sunucuya hiçbir şey gönderilmez.',
  gizlilik_tamam: 'Anladım',
};

export type Strings = typeof tr;

const en: Strings = {
  tab_aktiviteler: 'Activities',
  tab_favoriler: 'Favorites',
  tab_ayarlar: 'Settings',

  onb_merhaba: 'Hello!',
  onb_benim_adim: 'My name is Tabi.',
  onb_slogan: "We'll discover amazing\nactivities together",
  onb_baslayalim: "Let's Begin →",
  onb_kac_yas: 'How old is your child?',
  onb_devam: 'Continue →',
  onb_kac_sure: 'How much time do you have?',
  onb_hazirsin: "You're Ready! 🎉",
  onb_ozet_yas: (yas: string) => `activities for ${yas}`,
  onb_ozet_sure: (sure: string) => `${sure} games`,
  onb_kesfet: 'Start Exploring 🎯',

  sure_label: {
    '5':  { baslik: '5 minutes',   alt: 'Quick play' },
    '15': { baslik: '15 minutes',  alt: 'Relaxed activity' },
    '30': { baslik: '30 minutes+', alt: 'Extended fun' },
  },

  yas_label: {
    '0-1': { baslik: '0–1 years', alt: 'Baby' },
    '1-2': { baslik: '1–2 years', alt: 'Toddler' },
    '2-3': { baslik: '2–3 years', alt: 'Curious' },
    '3-5': { baslik: '3–5 years', alt: 'Creative' },
    '5-7': { baslik: '5–7 years', alt: 'Energetic' },
    '7-9': { baslik: '7–9 years', alt: 'Explorer' },
  },

  kat_label: {
    sanat:    'Art',
    hareket:  'Movement',
    zihinsel: 'Cognitive',
    doga:     'Nature',
    muzik:    'Music',
    dil:      'Language',
    motor:    'Motor',
    sosyal:   'Social',
  },

  zorluk_label: {
    kolay: 'easy',
    orta:  'medium',
    zor:   'hard',
  },

  ped_label: {
    sanat:    'Waldorf Inspired',
    hareket:  'Play Therapy Inspired',
    zihinsel: 'Montessori Inspired',
    doga:     'Montessori Inspired',
    muzik:    'Waldorf Inspired',
    dil:      'Development Focused',
    motor:    'Montessori Inspired',
    sosyal:   'Play Therapy Inspired',
  },

  ana_baslik: 'What shall we play? 🎯',
  ana_aktivite: 'activities',
  ana_yas_chip: 'Age ›',
  ana_tumu: '✦ All',
  ana_bos_baslik: 'Hmm, try something different...',
  ana_bos_alt: 'No activities found for this filter.',
  ana_filtre_temizle: 'Clear filter',
  kart_premium: 'PREMIUM',

  fav_baslik: 'My Favorites',
  fav_balon_var: (n: number) => `${n} favorite activities here! ❤️`,
  fav_balon_yok: 'Tap the heart icon to save ❤️',
  fav_bos_baslik: 'Hmm, no favorites yet...',
  fav_bos_alt: 'Tap the heart icon on activities to add them here',
  fav_git: 'Go to Activities',

  det_malzeme: '🛒 MATERIALS',
  det_nasil: '👣 HOW TO PLAY',
  det_ipucu: '💡 PARENT TIP',
  det_odak_but: '🎯 Play in Focus Mode',
  det_odak_alt: 'Only the steps — put your phone down!',
  det_tabi_ad: 'TABI',
  det_muhtesem: 'Amazing! 🎉',
  det_tamamlandi: 'You completed this activity!',
  det_harika: 'Great job!',
  det_yas: 'years',
  det_adim: 'steps',
  det_hata: 'Activity not found',
  det_geri: '← Go back',

  sure_tabi_balon: 'How much time\ndo you have today?',
  sure_git: 'Go to Activities 🎯',

  yas_tabi_balon: 'How old is your child?',
  yas_kaydet: 'Save ✓',
  yas_iptal: 'Cancel',

  ayt_baslik: 'Settings',
  ayt_tabi_balon: 'Customize everything here ⚙️',
  ayt_premium_baslik: 'Go Premium',
  ayt_premium_alt: 'Access all 200+ activities',
  ayt_ozellikler: [
    '✅ Full library for all age groups',
    '✅ New activities updated automatically',
    '✅ No ads, ever',
    '✅ Montessori & Waldorf based content',
  ],
  ayt_en_populer: '⭐ MOST POPULAR',
  ayt_yillik: 'Yearly — $9.99/year',
  ayt_yillik_alt: '$0.83/month · Cancel anytime',
  ayt_yukleniyor: 'Loading...',
  ayt_omur: 'Lifetime — $19.99',
  ayt_omur_alt: 'One-time, yours forever',
  ayt_geri_yukle: 'Restore Purchases',
  ayt_kosullar: 'Terms of Use',
  ayt_gizlilik_link: 'Privacy Policy',
  ayt_premium_aktif_baslik: 'Premium Active!',
  ayt_premium_aktif_alt: 'You have access to all activities',
  ayt_hakkinda: 'ABOUT',
  ayt_surum_baslik: 'Version',
  ayt_gizlilik_baslik: 'Privacy Policy',
  ayt_gizlilik_alt: 'We collect no data',
  ayt_arkadasaoner: 'Recommend to a Friend',
  ayt_arkadasaoner_alt: 'Share and make others happy',
  ayt_cevrimdisi: 'Works Offline',
  ayt_cevrimdisi_alt: 'No internet connection needed',
  ayt_sifirla_baslik: 'Reset Onboarding',
  ayt_sifirla_alt: 'For testing — return to first launch',
  ayt_felsefe: 'PHILOSOPHY',
  ayt_felsefe_1: 'This app is designed for screen-free, creative moments with your child. Ironically: you can put your phone down while playing.',
  ayt_felsefe_2: "Activities inspired by Montessori, Waldorf, and play therapy are curated to match your child's development.",

  paylasim_aktivite: (baslik: string) => `I did the "${baslik}" activity with my child! 🎉\n\nTry it 👉 200+ activities on Tabi.\n\nhttps://cocukoyna.app`,
  paylasim_arkadasaoner: 'Tabi — Play with Kids — 200+ pedagogy-based activities!\n\nhttps://cocukoyna.app',
  paylasim_baslik: 'Tabi — Play with Kids',

  gizlilik_baslik: 'Privacy Policy',
  gizlilik_mesaj: 'This app does not collect any personal data. All data is stored only on your device. Nothing is sent to any server.',
  gizlilik_tamam: 'Got it',
};

export { tr, en };
