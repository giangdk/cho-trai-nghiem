import React, { useState } from 'react';
import { CheckCircle2, Mail, Phone, MapPin, Quote, Sparkles, Activity } from 'lucide-react';
import { Language, PRESS_PARTNERS, TESTIMONIALS } from '../data/heritageData';
import { isValidEmail } from '../utils/marketplaceLogic';
import { trackMarketingEvent } from '../utils/tracking';
import {
  BoCongThuongBadge,
  HeritageShieldIcon,
  LoomShuttleIcon,
  LotusDivider,
  NonLaIcon,
} from './HeritageIcons';

interface HeritageStoryAndBookingSectionProps {
  lang: Language;
  onVoucherClaimed: (code: string) => void;
  onOpenPolicyModal: (tab: 'privacy' | 'refund' | 'terms' | 'tracking') => void;
}

export function HeritageStoryAndBookingSection({
  lang,
  onVoucherClaimed,
  onOpenPolicyModal,
}: HeritageStoryAndBookingSectionProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(newsletterEmail)) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('success');
    onVoucherClaimed('HERITAGE15');
    trackMarketingEvent('subscribe_newsletter_voucher', {
      email_domain: newsletterEmail.split('@')[1] || 'unknown',
      voucher_code: 'HERITAGE15',
    });
  };

  const usps = [
    {
      id: 'authentic',
      icon: <NonLaIcon className="w-9 h-9 text-[#8C4A27]" />,
      number: '01',
      title: {
        vi: 'Xác Thực 100% Từ Nghệ Nhân',
        en: '100% Artisan-Verified Authenticity',
      },
      description: {
        vi: 'Mọi trải nghiệm đều được giám tuyển trực tiếp cùng các nghệ nhân ưu tú và hộ gia đình giữ nghề truyền thống tại địa phương, không qua trung gian thương mại.',
        en: 'Every workshop is co-designed and hosted directly by meritorious village masters and traditional craft households—zero tourist-trap staging.',
      },
      metric: {
        vi: '42 làng nghề di sản đối tác độc quyền',
        en: '42 exclusive partner craft villages',
      },
    },
    {
      id: 'secure',
      icon: <HeritageShieldIcon className="w-9 h-9 text-[#2A6F64]" />,
      number: '02',
      title: {
        vi: 'Giao Dịch An Toàn & Minh Bạch',
        en: 'Transparent & Protected Payments',
      },
      description: {
        vi: 'Thanh toán đa nền tảng (VietQR, thẻ quốc tế, Ví điện tử) với chuẩn bảo mật quốc tế. Miễn phí đổi lịch hoặc hoàn tiền 100% trước 24 giờ khởi hành.',
        en: 'Multi-platform encrypted checkout (VietQR, Visa/Mastercard, E-Wallets) with 100% free rescheduling or full refund up to 24 hours prior.',
      },
      metric: {
        vi: 'Hoàn tiền tự động 100% trước 24h',
        en: '100% automated refund up to 24h prior',
      },
    },
    {
      id: 'sustainable',
      icon: <LoomShuttleIcon className="w-9 h-9 text-[#B8332A]" />,
      number: '03',
      title: {
        vi: 'Phát Triển Bền Vững Làng Nghề',
        en: 'Sustainable Heritage Preservation',
      },
      description: {
        vi: 'Cam kết 85% doanh thu từ mỗi tấm vé được chuyển trực tiếp cho gia đình nghệ nhân và Quỹ truyền nghề cho thế hệ trẻ tại địa phương.',
        en: '85% of every ticket goes directly to the host artisan household and local youth apprenticeship funds to keep ancient crafts alive.',
      },
      metric: {
        vi: '85% doanh thu về thẳng tay nghệ nhân',
        en: '85% direct payout to artisan families',
      },
    },
  ];

  const timelineSteps = [
    {
      step: '01',
      title: {
        vi: 'Tìm Kiếm Trải Nghiệm',
        en: 'Discover Experience',
      },
      desc: {
        vi: 'Chọn điểm đến, loại hình văn hóa yêu thích và xem câu chuyện của từng nghệ nhân.',
        en: 'Filter by destination, craft category, and explore each master artisan’s story.',
      },
    },
    {
      step: '02',
      title: {
        vi: 'Đặt Lịch & Thanh Toán',
        en: 'Schedule & Secure Pay',
      },
      desc: {
        vi: 'Chọn ngày giờ phù hợp, số người tham gia và thanh toán an toàn qua VietQR hoặc thẻ.',
        en: 'Select your preferred slot, guest count, and complete instant encrypted payment.',
      },
    },
    {
      step: '03',
      title: {
        vi: 'Nhận Vé Điện Tử (QR Code)',
        en: 'Receive QR E-Ticket',
      },
      desc: {
        vi: 'Nhận ngay mã vé QR cùng chỉ dẫn đường đi chi tiết tới sân nhà hoặc xưởng của nghệ nhân.',
        en: 'Get an instant QR E-Ticket with workshop directions and cultural preparation notes.',
      },
    },
    {
      step: '04',
      title: {
        vi: 'Bắt Đầu Hành Trình',
        en: 'Begin Your Journey',
      },
      desc: {
        vi: 'Xuất trình mã QR tại làng nghề, tự tay sáng tạo tác phẩm di sản và mang về làm kỷ niệm.',
        en: 'Scan your QR pass at the village, craft your own heritage piece, and take it home.',
      },
    },
  ];

  return (
    <>
      {/* SECTION 4: Unique Selling Propositions (USPs) */}
      <section
        id="why-us"
        className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-labelledby="usps-heading"
      >
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#2A6F64]">
            {lang === 'vi'
              ? '03. Tại Sao Chọn Hồn Việt?'
              : '03. Why Choose Hon Viet Marketplace?'}
          </div>
          <h2
            id="usps-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-serif-heritage font-bold text-[#1F1A17]"
            style={{ textWrap: 'balance' }}
          >
            {lang === 'vi'
              ? 'Chuẩn Mực Chuyên Nghiệp Cho Hành Trình Giàu Cảm Xúc'
              : 'Modern Booking Trust Meets Deep Cultural Authenticity'}
          </h2>
          <div className="flex justify-center pt-1">
            <LotusDivider className="w-40 h-6 text-[#8C4A27]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {usps.map((usp) => (
            <div
              key={usp.id}
              className="p-7 rounded-xl bg-white border border-[#E5DEC9] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-xl bg-[#FAF8F5] border border-[#E5DEC9] flex items-center justify-center">
                    {usp.icon}
                  </div>
                  <span className="font-mono-num text-sm font-semibold text-[#8C7A6B]">
                    {usp.number}
                  </span>
                </div>

                <h3 className="text-xl font-serif-heritage font-bold text-[#1F1A17]">
                  {usp.title[lang]}
                </h3>

                <p className="text-sm text-[#5C5346] leading-relaxed">
                  {usp.description[lang]}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0EAE1] text-xs font-semibold text-[#2A6F64]">
                {usp.metric[lang]}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: How It Works (4-Step Minimalist Timeline) */}
      <section
        id="how-it-works"
        className="py-16 lg:py-20 bg-[#1F1A17] text-[#FAF8F5]"
        aria-labelledby="timeline-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#D49B35]">
                {lang === 'vi' ? '04. Hướng Dẫn Đặt Chỗ' : '04. How It Works'}
              </div>
              <h2
                id="timeline-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-serif-heritage font-bold text-white"
              >
                {lang === 'vi'
                  ? 'Bốn Bước Chạm Vào Di Sản'
                  : 'Four Simple Steps to Your Cultural Journey'}
              </h2>
            </div>
            <p className="text-sm text-[#E5DEC9] max-w-md">
              {lang === 'vi'
                ? 'Quy trình đặt vé điện tử tinh gọn trong 60 giây, xác nhận tức thì qua mã QR không cần in vé giấy.'
                : 'Streamlined 60-second reservation process with instant paperless QR E-Ticket confirmation.'}
            </p>
          </div>

          {/* Horizontal on Desktop / Vertical on Mobile Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {timelineSteps.map((item, idx) => (
              <div
                key={item.step}
                className="relative p-6 rounded-xl bg-[#2A231F] border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-num text-2xl font-bold text-[#D49B35]">
                    {item.step}
                  </span>
                  {idx < timelineSteps.length - 1 && (
                    <span className="hidden md:inline-block text-xs text-[#8C7A6B] font-mono-num">
                      ───►
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-serif-heritage font-semibold text-white">
                  {item.title[lang]}
                </h3>
                <p className="text-xs sm:text-sm text-[#D5CBB8] leading-relaxed">
                  {item.desc[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Social Proof, Testimonials & Press Trust Badges */}
      <section
        id="testimonials"
        className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-labelledby="testimonials-heading"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2.5 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#8C4A27]">
              {lang === 'vi'
                ? '05. Lời Kể Từ Người Trải Nghiệm'
                : '05. Stories From Fellow Travelers'}
            </div>
            <h2
              id="testimonials-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-serif-heritage font-bold text-[#1F1A17]"
              style={{ textWrap: 'balance' }}
            >
              {lang === 'vi'
                ? 'Cảm Xúc Chân Thực Sau Mỗi Chuyến Đi'
                : 'Verified Impressions From Cultural Explorers'}
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-[#5C5346] font-mono-num">
            {lang === 'vi'
              ? '99.2% khách hàng hài lòng · 12.400+ lượt đặt vé thành công'
              : '99.2% guest satisfaction · 12,400+ verified bookings'}
          </div>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-14">
          {TESTIMONIALS.map((review) => (
            <blockquote
              key={review.id}
              className="p-6 sm:p-7 rounded-xl bg-white border border-[#E5DEC9] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Quote className="w-7 h-7 text-[#D49B35]/60" />
                  <span className="text-xs text-[#8C4A27] font-medium">
                    {review.experienceTitle[lang]}
                  </span>
                </div>
                <p className="text-sm text-[#1F1A17] leading-relaxed italic">
                  "{review.quote[lang]}"
                </p>
              </div>

              <footer className="flex items-center gap-3.5 pt-4 border-t border-[#F0EAE1]">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-serif-heritage font-bold text-sm shrink-0"
                  style={{ backgroundColor: review.accentColor }}
                  aria-hidden="true"
                >
                  {review.initials}
                </div>
                <div>
                  <cite className="not-italic font-bold text-sm text-[#1F1A17] block">
                    {review.name}
                  </cite>
                  <span className="text-xs text-[#5C5346] block">
                    {review.nationality[lang]} · {review.role[lang]}
                  </span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Press & Institutional Trust Badges */}
        <div className="pt-8 border-t border-[#E5DEC9]">
          <p className="text-center text-xs uppercase tracking-widest text-[#8C7A6B] font-semibold mb-6">
            {lang === 'vi'
              ? 'Được Nhắc Đến & Đồng Hành Bởi Các Tổ Chức Uy Tín'
              : 'Featured In & Endorsed By Cultural Institutions'}
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PRESS_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="p-4 rounded-lg bg-[#F3EFEA] border border-[#E5DEC9] text-center"
              >
                <div className="font-serif-heritage font-bold text-base text-[#1F1A17]">
                  {partner.name}
                </div>
                <div className="text-xs text-[#5C5346] mt-0.5">{partner.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Final CTA & Newsletter (Indochine Encaustic Tile Watermark Pattern) */}
      <section
        id="newsletter"
        className="py-16 lg:py-24 bg-indochine-pattern text-[#FAF8F5] border-t border-[#D49B35]/30"
        aria-labelledby="newsletter-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D49B35] font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>
              {lang === 'vi'
                ? 'Cẩm Nang Văn Hóa & Ưu Đãi Thành Viên Mới'
                : 'Cultural Guidebook & First-Journey Welcome Privilege'}
            </span>
          </div>

          <h2
            id="newsletter-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-serif-heritage font-bold text-white tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            {lang === 'vi'
              ? 'Sẵn Sàng Cho Chuyến Du Hành Thời Gian?'
              : 'Ready For Your Journey Through Time?'}
          </h2>

          <p className="text-base sm:text-lg text-[#E5DEC9] max-w-2xl mx-auto leading-relaxed">
            {lang === 'vi'
              ? 'Để lại email để nhận ấn phẩm số "Cẩm nang 42 Làng nghề Việt Nam" và mã voucher giảm 15% (HERITAGE15) cho trải nghiệm đầu tiên của bạn.'
              : 'Enter your email to receive our digital "Guide to 42 Vietnamese Craft Villages" and a 15% voucher (HERITAGE15) for your first booking.'}
          </p>

          {newsletterStatus === 'success' ? (
            <div
              role="status"
              className="max-w-xl mx-auto p-6 rounded-xl bg-[#2A6F64]/25 border border-[#2A6F64] text-white space-y-2"
            >
              <div className="flex items-center justify-center gap-2 text-[#D49B35] font-semibold">
                <CheckCircle2 className="w-5 h-5" />
                <span>
                  {lang === 'vi'
                    ? 'Đăng ký thành công! Mã ưu đãi 15% đã được kích hoạt:'
                    : 'Subscribed! Your 15% cultural voucher is now active:'}
                </span>
              </div>
              <div className="text-2xl font-mono-num font-bold tracking-widest text-white bg-black/40 py-2 px-4 rounded-lg inline-block">
                HERITAGE15
              </div>
              <p className="text-xs text-[#E5DEC9]">
                {lang === 'vi'
                  ? 'Mã HERITAGE15 đã được tự động điền sẵn vào cửa sổ Đặt vé cho bạn.'
                  : 'Code HERITAGE15 has been automatically applied to your booking drawer.'}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              noValidate
              className="max-w-xl mx-auto pt-2"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="newsletter-email-input" className="sr-only">
                  {lang === 'vi' ? 'Địa chỉ Email của bạn' : 'Your Email Address'}
                </label>
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterStatus === 'error') setNewsletterStatus('idle');
                  }}
                  placeholder={
                    lang === 'vi'
                      ? 'Nhập email của bạn (VD: minhkhue@email.com)...'
                      : 'Enter your email address...'
                  }
                  className="flex-1 px-4 py-3.5 rounded-lg bg-white text-[#1F1A17] text-sm placeholder:text-[#8C7A6B] focus:outline-none focus:ring-2 focus:ring-[#D49B35]"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 bg-[#B8332A] hover:bg-[#9E2820] text-white font-semibold text-sm rounded-lg shadow-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {lang === 'vi' ? 'Nhận Ưu Đãi' : 'Claim 15% Voucher'}
                </button>
              </div>
              {newsletterStatus === 'error' && (
                <p role="alert" className="text-xs text-[#FF8A80] mt-2 text-left">
                  {lang === 'vi'
                    ? 'Vui lòng nhập địa chỉ email hợp lệ (ví dụ: ten@domain.com).'
                    : 'Please enter a valid email address (e.g., name@domain.com).'}
                </p>
              )}
            </form>
          )}
        </div>
      </section>

      {/* SECTION 8: Professional & Transparent Footer */}
      <footer className="bg-[#161210] text-[#D5CBB8] pt-16 pb-24 md:pb-14 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Col 1: Brand, Office Address, Hotline, Email */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-2xl font-serif-heritage font-bold text-white tracking-tight">
                Hồn Việt
              </div>
              <p className="text-xs sm:text-sm text-[#B8ACA0] leading-relaxed max-w-md">
                {lang === 'vi'
                  ? 'Nền tảng thương mại điện tử chuyên biệt kết nối du khách trong nước & quốc tế với hơn 200+ trải nghiệm làng nghề thủ công, ẩm thực và nghệ thuật dân gian Việt Nam.'
                  : 'Vietnam’s dedicated cultural marketplace connecting travelers with 200+ authentic craft village, culinary, and folk art experiences.'}
              </p>
              <div className="space-y-2 text-xs text-[#D5CBB8] pt-1">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D49B35] shrink-0 mt-0.5" />
                  <span>
                    {lang === 'vi'
                      ? 'Văn phòng: Tầng 4, Tòa nhà Di Sản Đông Dương, 48 Lý Thường Kiệt, Quận Hoàn Kiếm, Hà Nội'
                      : 'Headquarters: 4th Floor, Indochine Heritage Building, 48 Ly Thuong Kiet, Hoan Kiem, Hanoi'}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#D49B35] shrink-0" />
                  <span className="font-mono-num">
                    Hotline: 1900 6886 (08:00 – 21:00) · +84 (024) 3936 8899
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#D49B35] shrink-0" />
                  <span>Email: cskh@honviet-heritage.vn · doi-tac@honviet-heritage.vn</span>
                </div>
              </div>
            </div>

            {/* Col 2: Heritage Categories */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                {lang === 'vi' ? 'Danh Mục Di Sản' : 'Heritage Categories'}
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <a href="#categories" className="hover:text-white transition-colors">
                    {lang === 'vi' ? 'Nghệ thuật Thủ công Bát Tràng & Hội An' : 'Bat Trang & Hoi An Craftsmanship'}
                  </a>
                </li>
                <li>
                  <a href="#categories" className="hover:text-white transition-colors">
                    {lang === 'vi' ? 'Hương vị Bản địa & Trà đạo Xứ Huế' : 'Hue Royal Lotus Tea & Folk Cuisine'}
                  </a>
                </li>
                <li>
                  <a href="#categories" className="hover:text-white transition-colors">
                    {lang === 'vi' ? 'Múa Rối Nước & Nhã Nhạc Dân Gian' : 'Water Puppetry & Folk Music'}
                  </a>
                </li>
                <li>
                  <a href="#categories" className="hover:text-white transition-colors">
                    {lang === 'vi' ? 'Sống Cùng Người Dân Mùa Gặt' : 'Countryside Harvest with Locals'}
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Customer Policies & Ministry Seal */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                {lang === 'vi' ? 'Chính Sách & Minh Bạch' : 'Policies & Compliance'}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenPolicyModal('privacy')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {lang === 'vi' ? 'Chính sách Bảo mật Thông tin' : 'Privacy & Data Protection Policy'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenPolicyModal('refund')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {lang === 'vi' ? 'Chính sách Hoàn hủy & Đổi lịch (24h)' : '24-Hour Free Refund & Reschedule Policy'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenPolicyModal('terms')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {lang === 'vi' ? 'Điều khoản Dịch vụ & Quy tắc Ứng xử Văn hóa' : 'Terms of Service & Cultural Etiquette'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenPolicyModal('tracking')}
                    className="inline-flex items-center gap-1.5 text-[#D49B35] hover:underline cursor-pointer text-left"
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>
                      {lang === 'vi'
                        ? 'Cấu hình Đo lường (GA4 · Meta Pixel · Hotjar)'
                        : 'Analytics & Tracking Inspector (GA4 · Pixel · Hotjar)'}
                    </span>
                  </button>
                </li>
              </ul>

              <div className="pt-2">
                <BoCongThuongBadge lang={lang} />
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Social Links */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7A6B]">
            <div>
              © 2026 Công ty Cổ phần Di Sản Sống Hồn Việt (MST: 0109887261).{' '}
              {lang === 'vi' ? 'Bảo lưu mọi quyền.' : 'All rights reserved.'}
            </div>
            <div className="flex items-center gap-5">
              <a
                href="#featured"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors"
              >
                Facebook
              </a>
              <a
                href="#featured"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="#featured"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors"
              >
                YouTube
              </a>
              <a
                href="#featured"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
