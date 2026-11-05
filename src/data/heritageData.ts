export type Language = 'vi' | 'en';

export type CategoryId = 'all' | 'craft' | 'culinary' | 'folk_art' | 'local_life';

export type LocationId = 'all' | 'Ha Noi' | 'Hoi An' | 'Hue' | 'Ninh Binh';

export interface ExperienceItem {
  id: string;
  categoryId: Exclude<CategoryId, 'all'>;
  locationId: Exclude<LocationId, 'all'>;
  image: string;
  rating: number;
  reviewCount: number;
  durationHours: number;
  originalPriceVnd: number;
  salePriceVnd: number;
  badgeType: 'bestseller' | 'discount' | 'artisan_choice';
  discountPercent: number;
  artisanName: string;
  artisanTitle: {
    vi: string;
    en: string;
  };
  title: {
    vi: string;
    en: string;
  };
  locationLabel: {
    vi: string;
    en: string;
  };
  categoryLabel: {
    vi: string;
    en: string;
  };
  summary: {
    vi: string;
    en: string;
  };
  highlights: {
    vi: string[];
    en: string[];
  };
}

export interface CategoryInfo {
  id: Exclude<CategoryId, 'all'>;
  count: number;
  image: string;
  title: {
    vi: string;
    en: string;
  };
  subtitle: {
    vi: string;
    en: string;
  };
  activities: {
    vi: string;
    en: string;
  };
}

export interface TestimonialItem {
  id: string;
  name: string;
  nationality: {
    vi: string;
    en: string;
  };
  role: {
    vi: string;
    en: string;
  };
  experienceTitle: {
    vi: string;
    en: string;
  };
  quote: {
    vi: string;
    en: string;
  };
  initials: string;
  accentColor: string;
}

export const HERITAGE_IMAGES = {
  heroPottery: '/src/assets/images/hero_vietnam_pottery_1793893126034.jpg',
  batTrang: '/src/assets/images/exp_battrang_pottery_1793893125527.jpg',
  hoiAnSilk: '/src/assets/images/exp_hoian_silk_lantern_1793893126259.jpg',
  hueTea: '/src/assets/images/exp_hue_tea_cuisine_1793893127606.jpg',
  folkMusic: '/src/assets/images/exp_folk_music_puppetry_1793893128864.jpg',
  riceHarvest: '/src/assets/images/exp_rice_harvest_village_1793893134431.jpg',
};

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'craft',
    count: 68,
    image: HERITAGE_IMAGES.batTrang,
    title: {
      vi: 'Nghệ Thuật Thủ Công',
      en: 'Traditional Craftsmanship',
    },
    subtitle: {
      vi: 'Chạm tay vào đất sét, tơ tằm và giấy dó trăm năm',
      en: 'Shape centuries-old clay, mulberry silk, and Do paper by hand',
    },
    activities: {
      vi: 'Làm gốm Bát Tràng · Dệt lụa · Làm giấy dó · Đan mây tre',
      en: 'Bat Trang Pottery · Silk Weaving · Do Paper · Bamboo Craft',
    },
  },
  {
    id: 'culinary',
    count: 54,
    image: HERITAGE_IMAGES.hueTea,
    title: {
      vi: 'Hương Vị Bản Địa',
      en: 'Indigenous Culinary Arts',
    },
    subtitle: {
      vi: 'Nấu ăn cùng gia đình bản xứ và thưởng trà cổ truyền',
      en: 'Cook with local families and savor royal lotus tea ceremonies',
    },
    activities: {
      vi: 'Nấu ăn truyền thống · Thử nếm trà Việt · Làm bánh dân gian',
      en: 'Traditional Cooking · Vietnamese Tea Tasting · Folk Pastry',
    },
  },
  {
    id: 'folk_art',
    count: 36,
    image: HERITAGE_IMAGES.folkMusic,
    title: {
      vi: 'Nhịp Điệu Dân Gian',
      en: 'Folk Performing Arts',
    },
    subtitle: {
      vi: 'Lắng nghe thanh âm di sản từ sân đình đến nhã nhạc cung đình',
      en: 'Immerse in UNESCO intangible musical heritage and water puppetry',
    },
    activities: {
      vi: 'Múa rối nước · Nghe Ca Trù · Nhã nhạc Cung đình · Đàn bầu',
      en: 'Water Puppetry · Ca Tru Singing · Royal Court Music · Dan Bau',
    },
  },
  {
    id: 'local_life',
    count: 49,
    image: HERITAGE_IMAGES.riceHarvest,
    title: {
      vi: 'Sống Cùng Người Dân',
      en: 'Living With Locals',
    },
    subtitle: {
      vi: 'Theo nhịp mùa màng trên đồng lúa chín và bến sông quê',
      en: 'Follow the rhythm of golden harvests, fishing nets, and river markets',
    },
    activities: {
      vi: 'Thu hoạch lúa mùa · Đánh cá truyền thống · Chợ nổi bình minh',
      en: 'Rice Harvesting · Traditional Net Fishing · Sunrise Floating Market',
    },
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'battrang-pottery-master',
    categoryId: 'craft',
    locationId: 'Ha Noi',
    image: HERITAGE_IMAGES.batTrang,
    rating: 4.95,
    reviewCount: 318,
    durationHours: 3,
    originalPriceVnd: 850000,
    salePriceVnd: 680000,
    badgeType: 'bestseller',
    discountPercent: 20,
    artisanName: 'NNƯT Phạm Văn Điền',
    artisanTitle: {
      vi: 'Nghệ nhân Ưu tú Gốm cổ Bát Tràng (Đời thứ 4)',
      en: '4th-Gen Meritorious Master Potter of Bat Trang',
    },
    title: {
      vi: 'Nghệ Nhân 1 Ngày Tại Làng Gốm Cổ Bát Tràng',
      en: 'One-Day Apprentice with a Master Potter in Bat Trang',
    },
    locationLabel: {
      vi: 'Gia Lâm, Hà Nội',
      en: 'Gia Lam, Hanoi',
    },
    categoryLabel: {
      vi: 'Nghệ thuật Thủ công',
      en: 'Craftsmanship',
    },
    summary: {
      vi: 'Trực tiếp nhào đất sét trắng, vuốt tay trên bàn xoay truyền thống và vẽ men lam cổ dưới sự hướng dẫn 1-1 của nghệ nhân lò bầu thế kỷ 19.',
      en: 'Wedging white clay, throwing on a traditional wheel, and painting cobalt-blue glazes 1-on-1 inside a 19th-century dragon kiln courtyard.',
    },
    highlights: {
      vi: [
        'Tự tay tạo hình và tráng men ngọc bích 02 tác phẩm gốm mang về',
        'Tham quan lò bầu cổ hơn 120 năm tuổi và nghe chuyện làng nghề',
        'Thưởng thức trà sen và bánh tẻ nóng hổi tại sân gạch cổ',
      ],
      en: [
        'Hand-throw and celadon-glaze 2 ceramic pieces to take home',
        'Private tour of a 120-year-old wood-fired dragon kiln',
        'Complimentary lotus tea and steamed rice cake in the courtyard',
      ],
    },
  },
  {
    id: 'hoian-silk-lantern-workshop',
    categoryId: 'craft',
    locationId: 'Hoi An',
    image: HERITAGE_IMAGES.hoiAnSilk,
    rating: 4.92,
    reviewCount: 246,
    durationHours: 3.5,
    originalPriceVnd: 920000,
    salePriceVnd: 736000,
    badgeType: 'discount',
    discountPercent: 20,
    artisanName: 'Nghệ nhân Huỳnh Thị Thu',
    artisanTitle: {
      vi: 'Nghệ nhân Làng lụa Mã Châu & Đèn lồng Phố Hội',
      en: 'Master Weaver of Ma Chau Silk & Hoi An Lanterns',
    },
    title: {
      vi: 'Ươm Tơ Dệt Lụa & Chế Tác Đèn Lồng Khung Tre Hội An',
      en: 'Mulberry Silk Weaving & Bamboo Lantern Crafting in Hoi An',
    },
    locationLabel: {
      vi: 'Phố cổ Hội An, Quảng Nam',
      en: 'Ancient Town, Hoi An',
    },
    categoryLabel: {
      vi: 'Nghệ thuật Thủ công',
      en: 'Craftsmanship',
    },
    summary: {
      vi: 'Trải nghiệm quy trình rút sợi tơ tằm vàng óng từ kén, dệt trên khung cửi gỗ và tự tay bọc lụa chiếc đèn lồng Hội An xếp gọn mang về.',
      en: 'Reel golden silk threads from cocoons on a wooden handloom and craft your own foldable bamboo-and-silk Hoi An lantern.',
    },
    highlights: {
      vi: [
        'Thực hành rút tơ từ kén tằm và dệt trên khung cửi gỗ truyền thống',
        'Tự tay vót nan tre già và bọc lụa tơ tằm hoàn thiện 01 đèn lồng',
        'Tặng kèm túi thơm thảo mộc bọc lụa tơ tằm Hội An',
      ],
      en: [
        'Reel raw silk threads and operate a vintage wooden handloom',
        'Shape seasoned bamboo ribs and wrap a custom silk lantern',
        'Includes a hand-sewn Hoi An silk herbal sachet keepsake',
      ],
    },
  },
  {
    id: 'hue-royal-tea-pastry',
    categoryId: 'culinary',
    locationId: 'Hue',
    image: HERITAGE_IMAGES.hueTea,
    rating: 4.98,
    reviewCount: 189,
    durationHours: 3,
    originalPriceVnd: 780000,
    salePriceVnd: 650000,
    badgeType: 'bestseller',
    discountPercent: 17,
    artisanName: 'Nghệ nhân Tôn Nữ Minh Tâm',
    artisanTitle: {
      vi: 'Truyền nhân Ẩm thực & Trà đạo Nhà vườn Kim Long',
      en: 'Heritage Culinary & Lotus Tea Master in Kim Long Garden House',
    },
    title: {
      vi: 'Trà Đạo Sen Tịnh Tâm & Làm Bánh Dân Gian Xứ Huế',
      en: 'Imperial Tinh Tam Lotus Tea & Traditional Hue Folk Pastries',
    },
    locationLabel: {
      vi: 'Nhà vườn Kim Long, Huế',
      en: 'Kim Long Garden House, Hue',
    },
    categoryLabel: {
      vi: 'Hương vị Bản địa',
      en: 'Indigenous Culinary',
    },
    summary: {
      vi: 'Khám phá nghệ thuật ướp trà trong bông sen Bách Diệp hồ Tịnh Tâm và tự tay gói bánh ít lá gai, bánh phu thê trong không gian nhà rường cổ.',
      en: 'Master the art of scenting tea inside hundred-petal Tinh Tam lotus blossoms and wrap traditional banana-leaf folk cakes in a Ruong house.',
    },
    highlights: {
      vi: [
        'Học kỹ thuật ủ trà sen Bách Diệp và pha trà bằng ấm đất nung',
        'Tự tay gói 03 loại bánh truyền thống xứ Huế bằng lá chuối tươi',
        'Thưởng trà, bánh trong không gian nhà rường gỗ mít hơn 100 năm',
      ],
      en: [
        'Learn lotus-blossom tea infusion and clay-pot brewing rituals',
        'Hand-wrap 3 varieties of royal Hue cakes in fresh banana leaves',
        'Enjoy tea service inside a 100-year-old jackfruit-wood garden house',
      ],
    },
  },
  {
    id: 'hanoi-water-puppet-danbau',
    categoryId: 'folk_art',
    locationId: 'Ha Noi',
    image: HERITAGE_IMAGES.folkMusic,
    rating: 4.94,
    reviewCount: 274,
    durationHours: 2.5,
    originalPriceVnd: 750000,
    salePriceVnd: 590000,
    badgeType: 'discount',
    discountPercent: 21,
    artisanName: 'NSƯT Nguyễn Hoàng Anh',
    artisanTitle: {
      vi: 'Nghệ sĩ Rối nước & Nhạc cụ Dân tộc Thăng Long',
      en: 'Meritorious Artist of Water Puppetry & Traditional Instruments',
    },
    title: {
      vi: 'Hậu Trường Thủy Đình: Điều Khiển Rối Nước & Chạm Nhịp Đàn Bầu',
      en: 'Backstage at the Water Pavilion: Puppetry & Dan Bau Workshop',
    },
    locationLabel: {
      vi: 'Hoàn Kiếm, Hà Nội',
      en: 'Hoan Kiem, Hanoi',
    },
    categoryLabel: {
      vi: 'Nhịp điệu Dân gian',
      en: 'Folk Performing Arts',
    },
    summary: {
      vi: 'Bước vào hậu trường thủy đình, tìm hiểu cơ chế máy sào dây dưới nước, thử gảy khúc dân ca trên độc huyền cầm và vẽ quân rối gỗ sung.',
      en: 'Step behind the bamboo screen of the water pavilion, operate underwater bamboo rod mechanisms, pluck the Dan Bau, and paint a fig-wood puppet.',
    },
    highlights: {
      vi: [
        'Trải nghiệm điều khiển quân rối cổ bằng máy sào và máy dây',
        'Học gảy giai điệu ngũ cung Việt Nam trên đàn bầu và đàn tranh',
        'Tự tay vẽ màu sơn mài lên 01 chú Tễu gỗ sung mini làm kỷ niệm',
      ],
      en: [
        'Operate traditional underwater bamboo-rod and string puppets',
        'Play pentatonic folk melodies on the single-string Dan Bau',
        'Hand-paint a miniature fig-wood Teu puppet to keep',
      ],
    },
  },
  {
    id: 'ninhbinh-golden-rice-harvest',
    categoryId: 'local_life',
    locationId: 'Ninh Binh',
    image: HERITAGE_IMAGES.riceHarvest,
    rating: 4.96,
    reviewCount: 205,
    durationHours: 4,
    originalPriceVnd: 950000,
    salePriceVnd: 760000,
    badgeType: 'bestseller',
    discountPercent: 20,
    artisanName: 'Gia đình Bác Bùi Văn Hợi',
    artisanTitle: {
      vi: 'Nông gia bảo tồn giống lúa nếp cổ Tam Cốc',
      en: 'Heritage Glutinous Rice Farming Family in Tam Coc',
    },
    title: {
      vi: 'Một Buổi Sáng Gặt Lúa Chín & Nấu Cơm Mới Bằng Bếp Củi',
      en: 'Golden Rice Harvest Morning & Wood-Fired New Rice Feast',
    },
    locationLabel: {
      vi: 'Tam Cốc, Ninh Bình',
      en: 'Tam Coc, Ninh Binh',
    },
    categoryLabel: {
      vi: 'Sống cùng Người dân',
      en: 'Living With Locals',
    },
    summary: {
      vi: 'Đội nón lá ra đồng cùng người dân lúc nắng sớm, gặt lúa bằng liềm cổ, đập lúa thủ công và quây quần bên bếp rơm thưởng thức cơm gạo mới.',
      en: 'Put on a conical hat at sunrise to harvest golden rice by hand, thresh grain in bamboo baskets, and share a wood-fired farm lunch.',
    },
    highlights: {
      vi: [
        'Trải nghiệm gặt lúa, bó lúa và giần sàng gạo theo lối xưa',
        'Đánh bắt cá đồng bằng nơm tre tại mương nước chân núi đá vôi',
        'Thưởng thức bữa cơm quê nấu bếp củi nồi gang cùng gia đình chủ nhà',
      ],
      en: [
        'Harvest, bundle, and winnow heirloom rice in woven bamboo trays',
        'Try traditional bamboo trap fishing in karst valley streams',
        'Share a cast-iron wood-fired harvest meal with the host family',
      ],
    },
  },
  {
    id: 'hanoi-dongho-dopaper-art',
    categoryId: 'craft',
    locationId: 'Ha Noi',
    image: HERITAGE_IMAGES.heroPottery,
    rating: 4.91,
    reviewCount: 162,
    durationHours: 2.5,
    originalPriceVnd: 680000,
    salePriceVnd: 544000,
    badgeType: 'artisan_choice',
    discountPercent: 20,
    artisanName: 'Nghệ nhân Nguyễn Đăng Tâm',
    artisanTitle: {
      vi: 'Nghệ nhân Tranh khắc gỗ dân gian & Giấy dó truyền thống',
      en: 'Master of Folk Woodblock Printing & Traditional Do Paper',
    },
    title: {
      vi: 'Seo Giấy Dó Thủ Công & In Tranh Khắc Gỗ Màu Tự Nhiên',
      en: 'Handmade Do Paper Scooping & Natural Pigment Woodblock Print',
    },
    locationLabel: {
      vi: 'Tây Hồ, Hà Nội',
      en: 'Tay Ho, Hanoi',
    },
    categoryLabel: {
      vi: 'Nghệ thuật Thủ công',
      en: 'Craftsmanship',
    },
    summary: {
      vi: 'Tự tay seo giấy từ vỏ cây dó, quét lớp điệp óng ánh từ vỏ sò biển và in ván khắc gỗ bằng màu sỏi son, lá chàm, hoa hòe tự nhiên.',
      en: 'Scoop fibrous Do bark paper, brush crushed sea-shell shimmer, and print century-old woodblocks using indigo, ochre, and Sophora flower pigments.',
    },
    highlights: {
      vi: [
        'Tìm hiểu cách chế màu tự nhiên từ than lá tre, hoa hòe, sỏi son',
        'Tự tay in 02 bức tranh mộc bản trên giấy dó quét điệp truyền thống',
        'Đóng khung tre thủ công hoàn chỉnh để treo trang trí',
      ],
      en: [
        'Grind natural mineral and botanical pigments from bamboo ash and shells',
        'Print 2 multi-layer woodblock artworks on shimmering Do paper',
        'Mount your print in a handcrafted split-bamboo frame',
      ],
    },
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'review-1',
    name: 'Nguyễn Minh Khuê',
    nationality: {
      vi: 'Việt Nam · Kiến trúc sư Nội thất',
      en: 'Vietnam · Interior Architect',
    },
    role: {
      vi: 'Đã trải nghiệm tại Bát Tràng & Huế',
      en: 'Verified Guest · Bat Trang & Hue',
    },
    experienceTitle: {
      vi: 'Nghệ Nhân 1 Ngày Tại Làng Gốm Cổ Bát Tràng',
      en: 'One-Day Apprentice with a Master Potter in Bat Trang',
    },
    quote: {
      vi: 'Trước đây tôi chỉ đi Bát Tràng để mua đồ chợ. Qua Hồn Việt, tôi được ngồi trong sân lò bầu 120 năm tuổi, nghe bác Điền kể chuyện đất sét và tự tay pha màu men ngọc bích. Vé QR quét rất nhanh, trải nghiệm sâu sắc và trân quý vô cùng.',
      en: 'Previously I only visited Bat Trang as a tourist market. Through Hon Viet, I sat inside a 120-year-old kiln courtyard learning celadon glaze secrets directly from Master Dien. Seamless QR check-in and deeply moving cultural depth.',
    },
    initials: 'MK',
    accentColor: '#8C4A27',
  },
  {
    id: 'review-2',
    name: 'Claire Dubois',
    nationality: {
      vi: 'Pháp · Nhà nghiên cứu Văn hóa',
      en: 'France · Cultural Researcher',
    },
    role: {
      vi: 'Đã trải nghiệm tại Hội An & Ninh Bình',
      en: 'Verified Guest · Hoi An & Ninh Binh',
    },
    experienceTitle: {
      vi: 'Ươm Tơ Dệt Lụa & Chế Tác Đèn Lồng Khung Tre Hội An',
      en: 'Mulberry Silk Weaving & Bamboo Lantern Crafting in Hoi An',
    },
    quote: {
      vi: 'Điều làm tôi tin tưởng nhất là tính minh bạch: 85% chi phí vé đến thẳng tay gia đình nghệ nhân. Buổi chiều dệt lụa cùng cô Thu ở Hội An không hề mang tính biểu diễn thương mại mà ấm áp như về thăm nhà người thân.',
      en: 'What won my trust immediately was the transparency: knowing 85% of proceeds go directly to the artisan household. Spending the afternoon weaving silk with Mrs. Thu felt like visiting family rather than a staged tour.',
    },
    initials: 'CD',
    accentColor: '#2A6F64',
  },
  {
    id: 'review-3',
    name: 'Kenji Takahashi',
    nationality: {
      vi: 'Nhật Bản · Giám đốc Sáng tạo',
      en: 'Japan · Creative Director',
    },
    role: {
      vi: 'Đã trải nghiệm tại Hà Nội',
      en: 'Verified Guest · Hanoi',
    },
    experienceTitle: {
      vi: 'Hậu Trường Thủy Đình: Điều Khiển Rối Nước & Chạm Nhịp Đàn Bầu',
      en: 'Backstage at the Water Pavilion: Puppetry & Dan Bau Workshop',
    },
    quote: {
      vi: 'Là người làm thiết kế tại Tokyo, tôi ấn tượng mạnh với cách nền tảng kết nối trải nghiệm đặt chỗ hiện đại với di sản truyền thống Việt Nam. Được chạm tay vào máy sào rối nước và tự vẽ chú Tễu là kỷ niệm đẹp nhất chuyến đi.',
      en: 'As a designer from Tokyo, I was struck by how effortlessly the platform bridges modern digital booking with living Vietnamese craft. Operating the underwater bamboo puppet rods backstage was the highlight of my trip.',
    },
    initials: 'KT',
    accentColor: '#B8332A',
  },
];

export const PRESS_PARTNERS = [
  { name: 'VnExpress Du Lịch', detail: 'Top 10 Nền tảng Văn hóa Sáng tạo 2026' },
  { name: 'Heritage Magazine', detail: 'Đối tác Bảo tồn Làng nghề Việt Nam' },
  { name: 'UNESCO Creative Cities', detail: 'Mạng lưới Thủ công & Nghệ thuật Dân gian' },
  { name: 'Condé Nast Traveler', detail: 'Curated Authentic Experiences in Asia' },
];
