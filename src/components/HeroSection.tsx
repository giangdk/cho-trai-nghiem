import React, { useState } from 'react';
import { Calendar, Compass, Globe, MapPin, Play, Pause, Search, Sparkles, Ticket } from 'lucide-react';
import { CategoryId, HERITAGE_IMAGES, Language, LocationId } from '../data/heritageData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  lang: Language;
  onToggleLang: (lang: Language) => void;
  selectedLocation: LocationId;
  selectedCategory: CategoryId;
  selectedDate: string;
  searchQuery: string;
  confirmedBookingsCount: number;
  onOpenBookingsDrawer: () => void;
  onLocationChange: (loc: LocationId) => void;
  onCategoryChange: (cat: CategoryId) => void;
  onDateChange: (date: string) => void;
  onSearchQueryChange: (q: string) => void;
  onExecuteSearch: () => void;
}

export function HeroSection({
  lang,
  onToggleLang,
  selectedLocation,
  selectedCategory,
  selectedDate,
  searchQuery,
  confirmedBookingsCount,
  onOpenBookingsDrawer,
  onLocationChange,
  onCategoryChange,
  onDateChange,
  onSearchQueryChange,
  onExecuteSearch,
}: HeroSectionProps) {
  const [ambientMotionPaused, setAmbientMotionPaused] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExecuteSearch();
  };

  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] flex flex-col justify-between overflow-hidden bg-[#1F1A17] text-[#FAF8F5]">
      {/* Background Cinematic Close-up Media with Slow-Motion Ken Burns Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className={`w-full h-full transition-transform duration-1000 ease-out ${
            ambientMotionPaused ? 'scale-100' : 'scale-105'
          }`}
        >
          <ResilientImage
            src={HERITAGE_IMAGES.heroPottery}
            alt={
              lang === 'vi'
                ? 'Nghệ nhân Bát Tràng chuốt gốm thủ công dưới nắng sớm'
                : 'Master Bat Trang potter shaping terracotta clay on a spinning wheel in warm sunlight'
            }
            eager={true}
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Measured Scrim Overlay for WCAG AA Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1A17] via-[#1F1A17]/65 to-[#1F1A17]/45" />
      </div>

      {/* Top Cultural Utility Bar (Bilingual Localization Toggle + Verified Heritage Trust + My Tickets) */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/15 text-xs text-[#E5DEC9]">
          <div className="flex items-center gap-3">
            <span className="font-medium tracking-wide text-[#D49B35]">
              {lang === 'vi'
                ? 'Di Sản Sống Việt Nam · Giám Tuyển Bởi Nghệ Nhân Làng Nghề'
                : 'Living Vietnamese Heritage · Curated Directly With Master Artisans'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {confirmedBookingsCount > 0 && (
              <button
                type="button"
                onClick={onOpenBookingsDrawer}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2A6F64] text-white font-semibold hover:bg-[#235C53] transition-colors cursor-pointer whitespace-nowrap"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>
                  {lang === 'vi'
                    ? `Vé QR Đã Đặt (${confirmedBookingsCount})`
                    : `My QR Tickets (${confirmedBookingsCount})`}
                </span>
              </button>
            )}

            {/* Ambient Slow-Motion Control */}
            <button
              type="button"
              onClick={() => setAmbientMotionPaused((p) => !p)}
              aria-label={
                ambientMotionPaused
                  ? lang === 'vi'
                    ? 'Phát chuyển động nền'
                    : 'Play ambient motion'
                  : lang === 'vi'
                    ? 'Tạm dừng chuyển động nền'
                    : 'Pause ambient motion'
              }
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FAF8F5] transition-colors cursor-pointer whitespace-nowrap"
            >
              {ambientMotionPaused ? (
                <Play className="w-3.5 h-3.5 text-[#D49B35]" />
              ) : (
                <Pause className="w-3.5 h-3.5 text-[#D49B35]" />
              )}
              <span>{lang === 'vi' ? 'Khung hình Điện ảnh' : 'Cinematic Frame'}</span>
            </button>

            {/* Smooth Bilingual Localization Switcher (VI / EN) */}
            <div
              className="inline-flex items-center p-0.5 rounded-lg bg-black/45 border border-white/20"
              role="group"
              aria-label={lang === 'vi' ? 'Chuyển đổi ngôn ngữ' : 'Language switcher'}
            >
              <Globe className="w-3.5 h-3.5 text-[#D49B35] ml-2 mr-1" />
              <button
                type="button"
                onClick={() => onToggleLang('vi')}
                aria-pressed={lang === 'vi'}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  lang === 'vi'
                    ? 'bg-[#B8332A] text-white'
                    : 'text-[#E5DEC9] hover:text-white'
                }`}
              >
                Tiếng Việt
              </button>
              <button
                type="button"
                onClick={() => onToggleLang('en')}
                aria-pressed={lang === 'en'}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  lang === 'en'
                    ? 'bg-[#B8332A] text-white'
                    : 'text-[#E5DEC9] hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Center Hero Headline & Narrative */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-3xl space-y-5">
          <p
            className="text-xs sm:text-sm font-medium tracking-widest uppercase text-[#D49B35]"
            style={{ textWrap: 'balance' }}
          >
            {lang === 'vi'
              ? 'Chợ Trải Nghiệm Văn Hóa & Làng Nghề Truyền Thống'
              : 'Authentic Vietnamese Craft, Culinary & Folk Art Marketplace'}
          </p>

          <h1
            className="font-serif-heritage font-bold text-white tracking-tight leading-[1.12]"
            style={{ fontSize: 'clamp(2.35rem, 4.5vw, 4rem)', textWrap: 'balance' }}
          >
            {lang === 'vi'
              ? 'Chạm Vào Hồn Việt — Sống Lại Tinh Hoa Truyền Thống'
              : 'Touch the Soul of Vietnam — Relive Timeless Heritage'}
          </h1>

          <p className="text-base sm:text-lg text-[#EAE3D5] leading-relaxed max-w-2xl">
            {lang === 'vi'
              ? 'Nền tảng đặt vé và khám phá hơn 200+ trải nghiệm thủ công, ẩm thực và nghệ thuật dân gian bản địa trên khắp Việt Nam. Kết nối trực tiếp với các nghệ nhân giữ lửa làng nghề.'
              : 'Discover and book over 200+ authentic handicraft, indigenous culinary, and folk art experiences across Vietnam. Curated directly with master village artisans.'}
          </p>

          {/* Unboxed Cultural Proof Strip */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-xs sm:text-sm text-[#E5DEC9] font-mono-num">
            <span>
              <strong className="text-white">217+</strong>{' '}
              {lang === 'vi' ? 'Trải nghiệm bản địa' : 'Curated Experiences'}
            </span>
            <span aria-hidden="true" className="text-[#D49B35]">
              ·
            </span>
            <span>
              <strong className="text-white">42</strong>{' '}
              {lang === 'vi' ? 'Làng nghề di sản' : 'Heritage Craft Villages'}
            </span>
            <span aria-hidden="true" className="text-[#D49B35]">
              ·
            </span>
            <span>
              <strong className="text-white">4.95/5</strong>{' '}
              {lang === 'vi' ? 'Đánh giá xác thực (12.400+ khách)' : 'Verified Rating (12,400+ guests)'}
            </span>
          </div>
        </div>
      </div>

      {/* Elevated Search & Filter Box (Bottom of Hero) */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <form
          onSubmit={handleFormSubmit}
          aria-label={lang === 'vi' ? 'Bộ lọc tìm kiếm trải nghiệm' : 'Experience search filter'}
          className="bg-[#FAF8F5] text-[#1F1A17] p-4 sm:p-5 rounded-xl shadow-xl border border-[#E5DEC9]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-end">
            {/* Field 1: Location */}
            <div className="lg:col-span-3">
              <label
                htmlFor="hero-location-select"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#5C5346] mb-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-[#B8332A]" />
                {lang === 'vi' ? 'Địa điểm di sản' : 'Destination'}
              </label>
              <select
                id="hero-location-select"
                value={selectedLocation}
                onChange={(e) => onLocationChange(e.target.value as LocationId)}
                className="w-full px-3.5 py-2.5 text-sm font-medium bg-white border border-[#D5CBB8] rounded-lg text-[#1F1A17] focus:outline-none focus:border-[#B8332A]"
              >
                <option value="all">
                  {lang === 'vi' ? 'Tất cả điểm đến (Việt Nam)' : 'All Destinations (Vietnam)'}
                </option>
                <option value="Ha Noi">
                  {lang === 'vi' ? 'Hà Nội & Bát Tràng' : 'Hanoi & Bat Trang'}
                </option>
                <option value="Hoi An">
                  {lang === 'vi' ? 'Phố cổ Hội An' : 'Hoi An Ancient Town'}
                </option>
                <option value="Hue">{lang === 'vi' ? 'Cố đô Huế' : 'Imperial City of Hue'}</option>
                <option value="Ninh Binh">
                  {lang === 'vi' ? 'Tam Cốc, Ninh Bình' : 'Tam Coc, Ninh Binh'}
                </option>
              </select>
            </div>

            {/* Field 2: Experience Category */}
            <div className="lg:col-span-3">
              <label
                htmlFor="hero-category-select"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#5C5346] mb-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-[#8C4A27]" />
                {lang === 'vi' ? 'Loại trải nghiệm' : 'Experience Type'}
              </label>
              <select
                id="hero-category-select"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value as CategoryId)}
                className="w-full px-3.5 py-2.5 text-sm font-medium bg-white border border-[#D5CBB8] rounded-lg text-[#1F1A17] focus:outline-none focus:border-[#B8332A]"
              >
                <option value="all">
                  {lang === 'vi' ? 'Tất cả loại hình' : 'All Categories'}
                </option>
                <option value="craft">
                  {lang === 'vi' ? 'Nghệ thuật Thủ công (Gốm, Lụa)' : 'Traditional Craftsmanship'}
                </option>
                <option value="culinary">
                  {lang === 'vi' ? 'Hương vị Bản địa (Trà, Bánh)' : 'Indigenous Culinary Arts'}
                </option>
                <option value="folk_art">
                  {lang === 'vi' ? 'Nhịp điệu Dân gian (Rối nước)' : 'Folk Performing Arts'}
                </option>
                <option value="local_life">
                  {lang === 'vi' ? 'Sống cùng Người dân (Mùa gặt)' : 'Living With Locals'}
                </option>
              </select>
            </div>

            {/* Field 3: Date */}
            <div className="lg:col-span-2">
              <label
                htmlFor="hero-date-input"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#5C5346] mb-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-[#2A6F64]" />
                {lang === 'vi' ? 'Ngày đi' : 'Date'}
              </label>
              <input
                id="hero-date-input"
                type="date"
                value={selectedDate}
                onChange={(e) => onDateChange(e.target.value)}
                className="w-full px-3 py-2.5 text-sm font-mono-num bg-white border border-[#D5CBB8] rounded-lg text-[#1F1A17] focus:outline-none focus:border-[#B8332A]"
              />
            </div>

            {/* Field 4: Keyword Search */}
            <div className="lg:col-span-2">
              <label
                htmlFor="hero-keyword-input"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#5C5346] mb-1.5"
              >
                <Search className="w-3.5 h-3.5 text-[#8C4A27]" />
                {lang === 'vi' ? 'Từ khóa' : 'Keyword'}
              </label>
              <input
                id="hero-keyword-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                placeholder={lang === 'vi' ? 'Làm gốm, dệt lụa...' : 'Pottery, silk...'}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D5CBB8] rounded-lg text-[#1F1A17] placeholder:text-[#9A8F80] focus:outline-none focus:border-[#B8332A]"
              />
            </div>

            {/* Primary High-Contrast CTA Button */}
            <div className="sm:col-span-2 lg:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-5 bg-[#B8332A] hover:bg-[#9E2820] active:translate-y-px text-white font-semibold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>{lang === 'vi' ? 'Khám Phá Ngay' : 'Explore Now'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
