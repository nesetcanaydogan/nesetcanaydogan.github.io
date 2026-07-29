/**
 * Apolitik Dükkan - Products Dataset & Store Model
 */

const PRODUCTS = [
  {
    id: "p1",
    name: "Mustafa Kemal Atatürk Canvas Tablo",
    subtitle: "Müze Kalitesinde Özel Kanvas Baskı",
    category: "Kurtuluş Savaşı",
    collection: "Kurucular Serisi",
    price: 1250.00,
    rating: 4.9,
    badge: "Öne Çıkan",
    image: "public/image_360.webp",
    gallery: [
      "public/image_360.webp",
      "public/img-0539.webp",
      "public/img-8143.webp"
    ],
    shortDesc: "Milli Mücadele'nin başkomutanı Mustafa Kemal Atatürk'ün minimalist stüdyo tonlarında yüksek çözünürlüklü müze kanvas baskısı.",
    longDesc: "Cumhuriyetimizin kurucusu Gazi Mustafa Kemal Atatürk'ün asaletini ve kararlılığını modern minimalist sanatla buluşturan bu özel kanvas tablo, 1. sınıf pamuklu müze tuvaline asitsiz boyalarla basılmıştır. Zamansız tasarımıyla salonunuza, ofisinize ve koleksiyonunuza saygın bir dokunuş katar.",
    specs: {
      "Boyut": "60 x 90 cm / 80 x 120 cm seçenekleri",
      "Malzeme": "%100 Pamuklu Müze Tuvali & Ahşap Kör Kasa",
      "Baskı": "Solmaya Dayanıklı Pigment Mürekkep",
      "Üretim": "Sınırlı Adet Özel Seri"
    },
    inStock: true,
    isFeatured: true
  },
  {
    id: "p2",
    name: "Nutuk Özel Ciltli Prestij Baskı",
    subtitle: "Deri Ciltli & Altın Yaldızlı Koleksiyon Nüshası",
    category: "Kemalizm",
    collection: "Kurucular Serisi",
    price: 1650.00,
    rating: 5.0,
    badge: "Sınırlı Üretim",
    image: "public/img-0539.webp",
    gallery: [
      "public/img-0539.webp",
      "public/altiok-a5-mockup.webp",
      "public/gunluk-bordo-mockup.webp"
    ],
    shortDesc: "Gazi Mustafa Kemal Atatürk'ün bizzat kaleme aldığı Nutuk'un tıpkıbasım belgeler ve haritalar içeren özel ciltli edisyonu.",
    longDesc: "1927 yılında okunan tarihi Nutuk metninin, orijinal belgelere ve krokilerine sadık kalınarak hazırlanan prestij ciltli özel baskısı. Hakiki deri sırtı, şerit ayracı ve özel muhafaza kutusu ile geleceğe miras kalacak koleksiyon değeri taşır.",
    specs: {
      "Sayfa Sayısı": "924 Sayfa (Kuşe Kağıt)",
      "Cilt Tip": "Deri Cilt & Sıcak Yaldız Baskı",
      "Ekler": "12 Adet Katlanır Orijinal Harp Haritası",
      "Sertifika": "Numaralı Koleksiyon Sertifikası"
    },
    inStock: true,
    isFeatured: true
  },
  {
    id: "p3",
    name: "Altıok A5 Deri Ciltli Defter",
    subtitle: "Cumhuriyet İdealleri Minimalist Defter",
    category: "Kemalizm",
    collection: "Devrim Estetiği",
    price: 350.00,
    rating: 4.8,
    badge: "Yeni",
    image: "public/altiok-a5-mockup.webp",
    gallery: [
      "public/altiok-a5-mockup.webp",
      "public/gunluk-bordo-mockup.webp"
    ],
    shortDesc: "Altı ok sembolizmini modern grafik dille birleştiren, premium fildişi kağıtlı tasarım defter.",
    longDesc: "Cumhuriyet'in temellerini oluşturan ilkeleri zarif bir kabartma baskıyla kapağında taşıyan Altıok Defter, düşüncelerinizi, notlarınızı ve çizimlerinizi kaydetmek için tasarlandı. Dolma kalem mürekkebini arkaya geçirmeyen 100gr özel kağıt dokusuyla yazma deneyimini üst seviyeye çıkarır.",
    specs: {
      "Ebat": "A5 (14.8 x 21 cm)",
      "Kağıt": "100gr Fildişi Krem Kağıt (Noktalı)",
      "Sayfa": "192 Sayfa",
      "Kapak": "Termo Deri & Göme Baskı"
    },
    inStock: true,
    isFeatured: true
  },
  {
    id: "p4",
    name: "Bordo Deri Anı Günlüğü",
    subtitle: "El Yapımı Geleneksel Ciltli Günlük",
    category: "Aksesuarlar",
    collection: "Devrim Estetiği",
    price: 420.00,
    rating: 4.7,
    badge: "Popüler",
    image: "public/gunluk-bordo-mockup.webp",
    gallery: [
      "public/gunluk-bordo-mockup.webp",
      "public/altiok-a5-mockup.webp"
    ],
    shortDesc: "Bordo tonlarında dikişli hakiki deri kapaklı, nostaljik ve şık anı defteri.",
    longDesc: "Tarih meraklıları ve yazı tutkunları için el işçiliğiyle hazırlanan Bordo Deri Günlük, eskimeyen duruşu ve kilitli elastik bandıyla hatıralarınızı güvenle muhafaza eder.",
    specs: {
      "Ebat": "13 x 18 cm",
      "Cilt": "El Dikişli Deri Kapak",
      "Kağıt": "Nostaljik Dokulu Kraft Kağıt",
      "Sayfa": "160 Sayfa"
    },
    inStock: true,
    isFeatured: false
  },
  {
    id: "p5",
    name: "İttihat ve Terakki Rozet Seti",
    subtitle: "Tarihi Pirinç Emaye Koleksiyon Rozetleri",
    category: "İttihat ve Terakki",
    collection: "Devrim Estetiği",
    price: 290.00,
    rating: 4.9,
    badge: "Özel Koleksiyon",
    image: "public/image_36033.webp",
    gallery: [
      "public/image_36033.webp",
      "public/img-8143.webp"
    ],
    shortDesc: "1908 Hürriyet Devrimi döneminin ikonik mühür ve amblemlerinden esinlenilmiş pirinç döküm 3'lü rozet seti.",
    longDesc: "Hürriyet, Müsavat, Adalet sloganlarının yazılı olduğu tarihi sembollerin aslına sadık minyatür dökümleri. Yaka, ceket ve çanta kullanımına uygun, kadife muhafaza kutusunda sunulmaktadır.",
    specs: {
      "Malzeme": "Antik Pirinç & Sıcak Emaye",
      "Adet": "3 Farklı Model Set",
      "Kutu": "Lüks Kadife Koleksiyon Kutusu",
      "Çap": "2.5 cm"
    },
    inStock: true,
    isFeatured: true
  },
  {
    id: "p6",
    name: "Kurtuluş Savaşı İpek Bayrak",
    subtitle: "Geleneksel Dokuma Ay Yıldızlı Sanat Eseri",
    category: "Bayraklar",
    collection: "Kurucular Serisi",
    price: 750.00,
    rating: 5.0,
    badge: "Öne Çıkan",
    image: "public/image_3605.webp",
    gallery: [
      "public/image_3605.webp",
      "public/image_360.webp"
    ],
    shortDesc: "Milli Mücadele ruhunu yaşatan, özel ipek dokuma ve el dikişli tarihi Türk Bayrağı.",
    longDesc: "Bağımsızlığımızın nişanesi olan al bayrağımızın 1920'ler dokuma standartlarına uygun ipek ve pamuk karışımı kenevir kumaş üzerine özel imalatı. Çerçeveletmeye veya sergilemeye uygundur.",
    specs: {
      "Boyut": "70 x 105 cm",
      "Kumaş": "%100 Ham İpek & Pamuk Dokuma",
      "Dikiş": "Çift Kat Kenar Baskı",
      "Kullanım": "İç Mekan & Koleksiyon Vitrini"
    },
    inStock: true,
    isFeatured: true
  },
  {
    id: "p7",
    name: "Cumhuriyet 100. Yıl Bronz Madalyon",
    subtitle: "Rölyef İşlemeli Hatıra Madalyonu",
    category: "Aksesuarlar",
    collection: "Kurucular Serisi",
    price: 540.00,
    rating: 4.9,
    badge: "Sınırlı Üretim",
    image: "public/img-8143.webp",
    gallery: [
      "public/img-8143.webp",
      "public/image_3601.webp"
    ],
    shortDesc: "Cumhuriyetin 100 yıllık şanlı geçmişine ithafen basılmış ağır bronz hatıra madalyonu.",
    longDesc: "Ön yüzünde Gazi Mustafa Kemal Atatürk rölyefi, arka yüzünde ise TBMM ve 1923-2023 ibaresi yer alan özel bronz hatıra parası. Pleksiglas sergileme stantlıdır.",
    specs: {
      "Çap": "50 mm",
      "Ağırlık": "65 gram",
      "Aptal": "Antik Bronz Kaplama",
      "Stant": "Akrilik Sergileme Ayağı Dahil"
    },
    inStock: true,
    isFeatured: false
  },
  {
    id: "p8",
    name: "Göktürk Mühür ve Antik Pusula",
    subtitle: "Pirinç Muhafazalı Tarihi Yön Pusulası",
    category: "Aksesuarlar",
    collection: "Devrim Estetiği",
    price: 890.00,
    rating: 4.8,
    badge: "Yeni",
    image: "public/image_3601.webp",
    gallery: [
      "public/image_3601.webp",
      "public/img-8143.webp"
    ],
    shortDesc: "Eski Türk alfabesi işlemeli, fonksiyonel pirinç denizci pusulası ve mühür seti.",
    longDesc: "Tarihin derinliklerinden günümüze pusulanın ve yol göstericiliğin sembolü. El işçiliği pirinç kasası, Göktürkçe 'Türk' yazılı mühür detayı ile masaüstü aksesuarı olarak eşsiz bir hediyedir.",
    specs: {
      "Malzeme": "%100 Masif Pirinç",
      "Mekanizma": "Sıvı Doygunluk Yön Pusulası",
      "Kutu": "Ahşap Hediye Kutusu",
      "Çap": "6 cm"
    },
    inStock: true,
    isFeatured: true
  }
];

const CATEGORIES = [
  { id: "cat-1", name: "Kurtuluş Savaşı", count: 12, icon: "flag", desc: "Milli Mücadele destanının simgesi olan özgün eserler." },
  { id: "cat-2", name: "Kemalizm", count: 18, icon: "auto_awesome", desc: "Cumhuriyet devrimleri ve Gazi'nin vizyonunu yansıtan tasarımlar." },
  { id: "cat-3", name: "İttihat ve Terakki", count: 8, icon: "shield", desc: "1908 Hürriyet Devrimi ve Meşrutiyet dönemi hatıraları." },
  { id: "cat-4", name: "Bayraklar", count: 6, icon: "military_tech", desc: "Özel dokuma ipek ve sancak koleksiyonları." },
  { id: "cat-5", name: "Aksesuarlar", count: 24, icon: "watch", desc: "Rozetler, mühürler, madalyonlar ve masaüstü objeleri." },
  { id: "cat-6", name: "Koleksiyon", count: 15, icon: "menu_book", desc: "Prestij kitaplar, tıpkıbasım evraklar ve büstler." }
];

// Helper Function: Get Product by ID
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
}

// Helper Function: Get Relative Asset Path based on document depth
function getAssetPath(path) {
  if (!path) return '';
  const isSubFolder = window.location.pathname.includes('/pages/');
  if (isSubFolder) {
    return path.startsWith('/') ? '..' + path : '../' + path;
  }
  return path;
}
