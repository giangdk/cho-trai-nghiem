import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES, CategoryId, Language } from '../data/heritageData';
import { ResilientImage } from './ResilientImage';
import { LotusDivider } from './HeritageIcons';

interface CategoriesSectionProps {
  lang: Language;
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
}

export function CategoriesSection({
  lang,
  selectedCategory,
  onSelectCategory,
}: CategoriesSectionProps) {
  return (
    <section
      id="categories"
      className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-labelledby="categories-heading"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#8C4A27]">
            {lang === 'vi'
              ? '01. Cảm Hứng & Phân Loại Trải Nghiệm'
              : '01. Cultural Inspiration & Categories'}
          </div>
          <h2
            id="categories-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-serif-heritage font-bold text-[#1F1A17] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            {lang === 'vi'
              ? 'Bốn Chiều Không Gian Văn Hóa Bản Địa'
              : 'Four Dimensions of Living Vietnamese Heritage'}
          </h2>
          <p className="text-sm sm:text-base text-[#5C5346] leading-relaxed">
            {lang === 'vi'
              ? 'Mỗi danh mục mở ra một cánh cửa bước vào nếp sống, đôi bàn tay tài hoa và tâm hồn của người nghệ nhân Việt.'
              : 'Each curated category opens a doorway into the timeless craft, flavors, music, and daily rhythms of local artisans.'}
          </p>
        </div>

        <LotusDivider className="hidden md:block w-40 h-6 text-[#8C4A27]" />
      </div>

      {/* Responsive 4-Card Grid / Touch Horizontal Scroll on Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              aria-pressed={isSelected}
              className={`group text-left rounded-xl overflow-hidden bg-white border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'border-[#B8332A] ring-2 ring-[#B8332A]/25 shadow-md'
                  : 'border-[#E5DEC9] hover:border-[#8C4A27] hover:shadow-md'
              }`}
            >
              {/* Card Image with Subtle Hover Zoom */}
              <div className="relative h-52 w-full overflow-hidden bg-[#2C1E16]">
                <ResilientImage
                  src={cat.image}
                  alt={cat.title[lang]}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <span className="text-xs font-mono-num text-[#E5DEC9]">
                    {cat.count} {lang === 'vi' ? 'trải nghiệm' : 'experiences'}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-xs flex items-center justify-center group-hover:bg-[#B8332A] transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </span>
                </div>
              </div>

              {/* Card Text Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-lg font-serif-heritage font-bold text-[#1F1A17] group-hover:text-[#B8332A] transition-colors">
                    {cat.title[lang]}
                  </h3>
                  <p className="text-xs text-[#5C5346] leading-relaxed line-clamp-2">
                    {cat.subtitle[lang]}
                  </p>
                </div>

                {/* Unboxed Metadata with Typographic Separators */}
                <div className="pt-3 border-t border-[#F0EAE1] text-[12px] text-[#8C4A27] font-medium leading-snug">
                  {cat.activities[lang]}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
