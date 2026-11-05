/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { Globe, Menu, Ticket, X } from 'lucide-react';
import {
  CategoryId,
  EXPERIENCES,
  ExperienceItem,
  Language,
  LocationId,
} from './data/heritageData';
import { filterExperiences } from './utils/marketplaceLogic';
import { trackMarketingEvent } from './utils/tracking';
import { HeroSection } from './components/HeroSection';
import { CategoriesSection } from './components/CategoriesSection';
import { FeaturedExperiencesSection } from './components/FeaturedExperiencesSection';
import { HeritageStoryAndBookingSection } from './components/HeritageStoryAndBookingSection';
import { BookingModal, ConfirmedBooking } from './components/BookingModal';
import { MyBookingsModal, PolicyAndTrackingModal } from './components/SecondaryModals';

export default function App() {
  const [lang, setLang] = useState<Language>('vi');
  const [selectedLocation, setSelectedLocation] = useState<LocationId>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-15');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeBookingExp, setActiveBookingExp] = useState<ExperienceItem | null>(null);
  const [confirmedBookings, setConfirmedBookings] = useState<ConfirmedBooking[]>([]);
  const [bookingsModalOpen, setBookingsModalOpen] = useState(false);
  const [savedVoucherCode, setSavedVoucherCode] = useState<string>('');
  const [activePolicyTab, setActivePolicyTab] = useState<
    'privacy' | 'refund' | 'terms' | 'tracking' | null
  >(null);

  const filteredExperiences = useMemo(() => {
    return filterExperiences(EXPERIENCES, {
      location: selectedLocation,
      category: selectedCategory,
      searchQuery,
      date: selectedDate,
    });
  }, [selectedLocation, selectedCategory, searchQuery, selectedDate]);

  const handleToggleLang = (nextLang: Language) => {
    setLang(nextLang);
    document.documentElement.lang = nextLang;
    trackMarketingEvent('switch_language', { language: nextLang });
  };

  const handleSelectCategory = (cat: CategoryId) => {
    setSelectedCategory(cat);
    trackMarketingEvent('select_category', { category: cat });
    const el = document.getElementById('featured');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExecuteSearch = () => {
    trackMarketingEvent('search_experiences', {
      location: selectedLocation,
      category: selectedCategory,
      keyword: searchQuery.trim() || 'all',
      date: selectedDate,
    });
    const el = document.getElementById('featured');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setSelectedLocation('all');
    setSelectedCategory('all');
    setSearchQuery('');
    trackMarketingEvent('reset_filters');
  };

  const handleOpenBooking = (exp: ExperienceItem) => {
    trackMarketingEvent('open_booking_modal', {
      experience_id: exp.id,
      price_vnd: exp.salePriceVnd,
    });
    setActiveBookingExp(exp);
  };

  const navLinks = [
    { href: '#categories', label: { vi: 'Danh Mục', en: 'Categories' } },
    { href: '#featured', label: { vi: 'Trải Nghiệm', en: 'Experiences' } },
    { href: '#why-us', label: { vi: 'Giá Trị', en: 'Why Us' } },
    { href: '#how-it-works', label: { vi: 'Quy Trình', en: 'How It Works' } },
    { href: '#testimonials', label: { vi: 'Đánh Giá', en: 'Reviews' } },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1F1A17]">
      {/* Strict 3-Zone Top Bar Contract (Sticky on md+, static on mobile to respect 15% mobile sticky cap) */}
      <header className="md:sticky md:top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single Text Element Brand Wordmark */}
          <a
            href="#"
            className="text-xl sm:text-2xl font-serif-heritage font-bold tracking-tight text-[#1F1A17] whitespace-nowrap shrink-0"
          >
            Hồn Việt
          </a>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav
            aria-label={lang === 'vi' ? 'Điều hướng chính' : 'Primary navigation'}
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C5346]"
          >
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-[#B8332A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                {item.label[lang]}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action (Desktop) / Compact Hamburger Button (Mobile) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleOpenBooking(EXPERIENCES[0])}
              className="hidden md:inline-flex px-4 py-2 text-xs font-semibold text-white bg-[#B8332A] hover:bg-[#9E2820] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {lang === 'vi' ? 'Đặt Vé Ngay' : 'Book Experience'}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={
                mobileMenuOpen
                  ? lang === 'vi'
                    ? 'Đóng menu di động'
                    : 'Close mobile menu'
                  : lang === 'vi'
                    ? 'Mở menu di động'
                    : 'Open mobile menu'
              }
              className="md:hidden p-2.5 rounded-lg border border-[#D5CBB8] text-[#1F1A17] hover:bg-[#F3EFEA] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF8F5] border-b border-[#E5DEC9] px-4 pt-3 pb-5 space-y-4">
            <nav className="flex flex-col space-y-2.5 text-sm font-semibold text-[#1F1A17]">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 border-b border-[#F0EAE1] hover:text-[#B8332A]"
                >
                  {item.label[lang]}
                </a>
              ))}
            </nav>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-medium text-[#5C5346] inline-flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#8C4A27]" />
                {lang === 'vi' ? 'Ngôn ngữ hiển thị:' : 'Language:'}
              </span>
              <div className="inline-flex rounded-lg border border-[#D5CBB8] p-0.5 bg-white">
                <button
                  type="button"
                  onClick={() => handleToggleLang('vi')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md ${
                    lang === 'vi' ? 'bg-[#B8332A] text-white' : 'text-[#5C5346]'
                  }`}
                >
                  VI
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleLang('en')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md ${
                    lang === 'en' ? 'bg-[#B8332A] text-white' : 'text-[#5C5346]'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Section 1: Hero Banner & Search Box */}
        <HeroSection
          lang={lang}
          onToggleLang={handleToggleLang}
          selectedLocation={selectedLocation}
          selectedCategory={selectedCategory}
          selectedDate={selectedDate}
          searchQuery={searchQuery}
          confirmedBookingsCount={confirmedBookings.length}
          onOpenBookingsDrawer={() => setBookingsModalOpen(true)}
          onLocationChange={setSelectedLocation}
          onCategoryChange={setSelectedCategory}
          onDateChange={setSelectedDate}
          onSearchQueryChange={setSearchQuery}
          onExecuteSearch={handleExecuteSearch}
        />

        {/* Section 2: Cultural Categories */}
        <CategoriesSection
          lang={lang}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Section 3: Featured & Flash Sale Experiences */}
        <FeaturedExperiencesSection
          lang={lang}
          experiences={filteredExperiences}
          selectedCategory={selectedCategory}
          selectedLocation={selectedLocation}
          searchQuery={searchQuery}
          onSelectCategory={setSelectedCategory}
          onResetFilters={handleResetFilters}
          onBookExperience={handleOpenBooking}
        />

        {/* Sections 4, 5, 6, 7 & 8: USPs, 4-Step Timeline, Testimonials, Indochine Newsletter, Footer */}
        <HeritageStoryAndBookingSection
          lang={lang}
          onVoucherClaimed={(code) => setSavedVoucherCode(code)}
          onOpenPolicyModal={(tab) => setActivePolicyTab(tab)}
        />
      </main>

      {/* Mobile-First Thumb-Zone Sticky Action Bar (Only on <md viewports, compact 56px height) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#1F1A17]/95 backdrop-blur-md border-t border-white/15 px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="text-xs text-[#E5DEC9] leading-tight">
          <span className="block text-[10px] uppercase tracking-wider text-[#D49B35] font-semibold">
            {lang === 'vi' ? 'Ưu đãi tới 21%' : 'Save up to 21%'}
          </span>
          <strong className="font-mono-num text-white">
            {lang === 'vi' ? 'Chỉ từ 544.000₫ / khách' : 'From 544,000₫ / guest'}
          </strong>
        </div>
        <div className="flex items-center gap-2">
          {confirmedBookings.length > 0 && (
            <button
              type="button"
              onClick={() => setBookingsModalOpen(true)}
              aria-label={lang === 'vi' ? 'Xem vé QR đã đặt' : 'View booked QR tickets'}
              className="p-2.5 rounded-lg bg-[#2A6F64] text-white"
            >
              <Ticket className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => handleOpenBooking(EXPERIENCES[0])}
            className="px-4 py-2.5 bg-[#B8332A] active:bg-[#9E2820] text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap"
          >
            {lang === 'vi' ? 'Khám Phá & Đặt Vé' : 'Book Experience'}
          </button>
        </div>
      </div>

      {/* Interactive Booking & QR E-Ticket Modal */}
      <BookingModal
        experience={activeBookingExp}
        lang={lang}
        defaultDate={selectedDate}
        savedVoucherCode={savedVoucherCode}
        onClose={() => setActiveBookingExp(null)}
        onConfirmBooking={(booking) => {
          setConfirmedBookings((prev) => [booking, ...prev]);
        }}
      />

      {/* Confirmed QR E-Tickets Drawer Modal */}
      <MyBookingsModal
        isOpen={bookingsModalOpen}
        lang={lang}
        bookings={confirmedBookings}
        onClose={() => setBookingsModalOpen(false)}
      />

      {/* Transparency Policies & GA4/Meta Pixel/Hotjar Inspector Modal */}
      <PolicyAndTrackingModal
        activeTab={activePolicyTab}
        lang={lang}
        onSelectTab={(tab) => setActivePolicyTab(tab)}
        onClose={() => setActivePolicyTab(null)}
      />
    </div>
  );
}
