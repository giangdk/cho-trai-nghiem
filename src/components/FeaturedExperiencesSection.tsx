import React from 'react';
import { Clock, MapPin, RotateCcw, Star } from 'lucide-react';
import {
  CategoryId,
  ExperienceItem,
  Language,
  LocationId,
} from '../data/heritageData';
import { formatVnd } from '../utils/marketplaceLogic';
import { ResilientImage } from './ResilientImage';

interface FeaturedExperiencesSectionProps {
  lang: Language;
  experiences: ExperienceItem[];
  selectedCategory: CategoryId;
  selectedLocation: LocationId;
  searchQuery: string;
  onSelectCategory: (cat: CategoryId) => void;
  onResetFilters: () => void;
  onBookExperience: (exp: ExperienceItem) => void;
}

export function FeaturedExperiencesSection({
  lang,
  experiences,
  selectedCategory,
  selectedLocation,
  searchQuery,
  onSelectCategory,
  onResetFilters,
  onBookExperience,
}: FeaturedExperiencesSectionProps) {
  const hasActiveFilter =
    selectedCategory !== 'all' || selectedLocation !== 'all' || searchQuery.trim().length > 0;

  const filterTabs: { id: CategoryId; label: { vi: string; en: string } }[] = [
    { id: 'all', label: { vi: 'Tất cả (6)', en: 'All (6)' } },
    { id: 'craft', label: { vi: 'Nghệ thuật Thủ công', en: 'Craftsmanship' } },
    { id: 'culinary', label: { vi: 'Hương vị Bản địa', en: 'Culinary Arts' } },
    { id: 'folk_art', label: { vi: 'Nhịp điệu Dân gian', en: 'Folk Arts' } },
    { id: 'local_life', label: { vi: 'Sống cùng Người dân', en: 'Local Life' } },
  ];

  const getBadgeLabel = (exp: ExperienceItem) => {
    if (exp.badgeType === 'bestseller') {
      return lang === 'vi'
        ? `Bán chạy · Giảm ${exp.discountPercent}%`
        : `Bestseller · Save ${exp.discountPercent}%`;
    }
    if (exp.badgeType === 'discount') {
      return lang === 'vi'
        ? `Ưu đãi Mùa Lễ Hội · Giảm ${exp.discountPercent}%`
        : `Seasonal Flash Sale · -${exp.discountPercent}%`;
    }
    return lang === 'vi'
      ? `Nghệ nhân Giám tuyển · Giảm ${exp.discountPercent}%`
      : `Artisan Curated · -${exp.discountPercent}%`;
  };

  return (
    <section
      id="featured"
      className="py-16 lg:py-24 bg-[#F3EFEA] border-y border-[#E5DEC9]"
      aria-labelledby="featured-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Interactive Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-2.5 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#B8332A]">
              {lang === 'vi'
                ? '02. Flash Sale & Trải Nghiệm Nổi Bật'
                : '02. Featured & Trending Experiences'}
            </div>
            <h2
              id="featured-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-serif-heritage font-bold text-[#1F1A17] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              {lang === 'vi'
                ? 'Những Hành Trình Được Yêu Thích Nhất'
                : 'Most Booked Artisan Workshops & Cultural Journeys'}
            </h2>
            <p className="text-sm sm:text-base text-[#5C5346]">
              {lang === 'vi'
                ? 'Đặt lịch trực tiếp với xưởng nghề và gia đình nghệ nhân. Giá minh bạch, bao gồm toàn bộ nguyên vật liệu thủ công.'
                : 'Book directly with authentic village workshops. Transparent pricing with all raw craft materials included.'}
            </p>
          </div>

          {/* Segmented Category Filter Bar (Interactive Functional Buttons) */}
          <div
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#E6DFD3] rounded-xl self-start lg:self-auto"
            role="group"
            aria-label={lang === 'vi' ? 'Lọc theo danh mục' : 'Filter by category'}
          >
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectCategory(tab.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === tab.id
                    ? 'bg-[#1F1A17] text-[#FAF8F5] shadow-xs'
                    : 'text-[#5C5346] hover:text-[#1F1A17]'
                }`}
              >
                {tab.label[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filter Status Bar */}
        {hasActiveFilter && (
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 px-4 py-3 rounded-lg bg-white border border-[#E5DEC9] text-xs text-[#5C5346]">
            <div>
              {lang === 'vi' ? 'Đang hiển thị ' : 'Showing '}
              <strong className="text-[#1F1A17] font-mono-num">{experiences.length}</strong>
              {lang === 'vi' ? ' trải nghiệm phù hợp' : ' matching experiences'}
              {selectedLocation !== 'all' && ` · ${selectedLocation}`}
              {searchQuery.trim() && ` · "${searchQuery.trim()}"`}
            </div>
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 font-semibold text-[#B8332A] hover:underline cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'Xóa bộ lọc' : 'Reset Filters'}</span>
            </button>
          </div>
        )}

        {/* Experience Cards Grid */}
        {experiences.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#E5DEC9] p-12 text-center max-w-lg mx-auto my-6 space-y-4">
            <h3 className="text-xl font-serif-heritage font-bold text-[#1F1A17]">
              {lang === 'vi'
                ? 'Chưa tìm thấy trải nghiệm trùng khớp'
                : 'No matching cultural experiences found'}
            </h3>
            <p className="text-sm text-[#5C5346]">
              {lang === 'vi'
                ? 'Hãy thử mở rộng địa điểm hoặc xóa từ khóa tìm kiếm để khám phá trọn vẹn 6 gói trải nghiệm di sản nổi bật.'
                : 'Try broadening your destination filter or clearing the keyword to explore all 6 featured heritage workshops.'}
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="px-5 py-2.5 bg-[#B8332A] text-white text-xs font-semibold rounded-lg hover:bg-[#9E2820] transition-colors cursor-pointer"
            >
              {lang === 'vi' ? 'Xem Tất Cả Trải Nghiệm' : 'Show All Experiences'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {experiences.map((exp) => (
              <article
                key={exp.id}
                className="group bg-white rounded-xl border border-[#E5DEC9] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div>
                  {/* 4:3 Thumbnail with Unobstructed Documentary Photography */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-[#2C1E16]">
                    <ResilientImage
                      src={exp.image}
                      alt={exp.title[lang]}
                      className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                    {/* Artisan Attribution on Bottom Scrim */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                      <span className="font-medium text-[#FAF8F5]">
                        {exp.artisanName}
                      </span>
                      <span className="font-mono-num font-semibold text-[#D49B35]">
                        -{exp.discountPercent}%
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 space-y-2.5">
                    {/* Unboxed Status Kicker & Metadata Line */}
                    <div className="text-xs font-semibold text-[#B8332A] tracking-wide">
                      {getBadgeLabel(exp)}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#5C5346] font-mono-num">
                      <span className="inline-flex items-center gap-1 font-semibold text-[#1F1A17]">
                        <Star className="w-3.5 h-3.5 fill-[#D49B35] text-[#D49B35]" />
                        {exp.rating.toFixed(2)} ({exp.reviewCount})
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#8C4A27]" />
                        {exp.durationHours} {lang === 'vi' ? 'giờ' : 'hrs'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1 font-sans">
                        <MapPin className="w-3.5 h-3.5 text-[#B8332A]" />
                        {exp.locationLabel[lang]}
                      </span>
                    </div>

                    {/* Experience Title */}
                    <h3 className="text-lg sm:text-xl font-serif-heritage font-bold text-[#1F1A17] leading-snug group-hover:text-[#B8332A] transition-colors">
                      {exp.title[lang]}
                    </h3>

                    {/* Summary Description */}
                    <p className="text-xs sm:text-sm text-[#5C5346] leading-relaxed line-clamp-2">
                      {exp.summary[lang]}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Strikethrough Old Price, Sale Price & Primary Booking CTA */}
                <div className="px-5 sm:px-6 py-4 bg-[#FAF8F5] border-t border-[#EFEAE1] flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-[#8C7A6B] line-through font-mono-num">
                      {formatVnd(exp.originalPriceVnd)}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-[#B8332A] font-mono-num">
                        {formatVnd(exp.salePriceVnd)}
                      </span>
                      <span className="text-xs text-[#5C5346]">
                        / {lang === 'vi' ? 'khách' : 'guest'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onBookExperience(exp)}
                    className="px-4 py-2.5 bg-[#1F1A17] hover:bg-[#B8332A] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {lang === 'vi' ? 'Đặt Trải Nghiệm' : 'Book Now'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
