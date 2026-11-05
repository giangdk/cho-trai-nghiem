import React, { useEffect, useState } from 'react';
import { Calendar, CheckCircle2, Clock, MapPin, ShieldCheck, Ticket, Users, X } from 'lucide-react';
import { ExperienceItem, Language } from '../data/heritageData';
import {
  calculateBookingPrice,
  formatVnd,
  generateTicketCode,
  validateBookingInput,
} from '../utils/marketplaceLogic';
import { TicketQrCodeSvg } from './HeritageIcons';
import { ResilientImage } from './ResilientImage';
import { trackMarketingEvent } from '../utils/tracking';

export interface ConfirmedBooking {
  ticketCode: string;
  experience: ExperienceItem;
  fullName: string;
  phone: string;
  email: string;
  date: string;
  guests: number;
  totalVnd: number;
  voucherApplied: boolean;
  createdAt: string;
}

interface BookingModalProps {
  experience: ExperienceItem | null;
  lang: Language;
  defaultDate: string;
  savedVoucherCode: string;
  onClose: () => void;
  onConfirmBooking: (booking: ConfirmedBooking) => void;
}

const ERROR_MESSAGES: Record<string, { vi: string; en: string }> = {
  name_required: {
    vi: 'Vui lòng nhập họ và tên người đặt vé (tối thiểu 2 ký tự).',
    en: 'Please enter your full name (at least 2 characters).',
  },
  phone_invalid: {
    vi: 'Vui lòng nhập số điện thoại hợp lệ (8–15 chữ số).',
    en: 'Please enter a valid phone number (8–15 digits).',
  },
  email_invalid: {
    vi: 'Vui lòng nhập địa chỉ email hợp lệ để nhận vé QR điện tử.',
    en: 'Please enter a valid email address to receive your QR E-Ticket.',
  },
  date_required: {
    vi: 'Vui lòng chọn ngày tham gia trải nghiệm.',
    en: 'Please select an experience date.',
  },
  guests_invalid: {
    vi: 'Số lượng khách phải từ 1 đến 20 người.',
    en: 'Number of guests must be between 1 and 20.',
  },
};

export function BookingModal({
  experience,
  lang,
  defaultDate,
  savedVoucherCode,
  onClose,
  onConfirmBooking,
}: BookingModalProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(defaultDate || '2026-11-15');
  const [guests, setGuests] = useState(2);
  const [voucherCode, setVoucherCode] = useState(savedVoucherCode || '');
  const [paymentMethod, setPaymentMethod] = useState<'vietqr' | 'card' | 'momo'>('vietqr');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedTicket, setConfirmedTicket] = useState<ConfirmedBooking | null>(null);

  useEffect(() => {
    if (savedVoucherCode) {
      setVoucherCode(savedVoucherCode);
    }
  }, [savedVoucherCode]);

  useEffect(() => {
    if (experience) {
      setConfirmedTicket(null);
      setErrorMsg(null);
      if (defaultDate) setDate(defaultDate);
      if (savedVoucherCode) setVoucherCode(savedVoucherCode);
    }
  }, [experience, defaultDate, savedVoucherCode]);

  if (!experience) return null;

  const priceSummary = calculateBookingPrice(experience.salePriceVnd, guests, voucherCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingInput({
      fullName,
      phone,
      email,
      date,
      guests,
      voucherCode,
    });

    if (!validation.valid && validation.errorKey) {
      setErrorMsg(ERROR_MESSAGES[validation.errorKey][lang]);
      return;
    }

    setErrorMsg(null);
    const ticketCode = generateTicketCode(experience.id, fullName, date);
    const booking: ConfirmedBooking = {
      ticketCode,
      experience,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      date,
      guests: priceSummary.guests,
      totalVnd: priceSummary.totalVnd,
      voucherApplied: priceSummary.voucherApplied,
      createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    trackMarketingEvent('purchase_experience_ticket', {
      experience_id: experience.id,
      ticket_code: ticketCode,
      guests: priceSummary.guests,
      value_vnd: priceSummary.totalVnd,
      voucher_applied: priceSummary.voucherApplied,
    });

    setConfirmedTicket(booking);
    onConfirmBooking(booking);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E5DEC9] rounded-xl shadow-2xl overflow-hidden my-8">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1F1A17] text-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <Ticket className="w-5 h-5 text-[#D49B35]" />
            <h2 id="booking-modal-title" className="text-lg font-serif-heritage font-semibold">
              {confirmedTicket
                ? lang === 'vi'
                  ? 'Vé Điện Tử QR Code Đã Xác Nhận'
                  : 'Confirmed E-Ticket & QR Pass'
                : lang === 'vi'
                  ? 'Đặt Lịch Trải Nghiệm Văn Hóa'
                  : 'Reserve Cultural Experience'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={lang === 'vi' ? 'Đóng cửa sổ đặt vé' : 'Close booking modal'}
            className="p-1.5 rounded-lg text-[#E5DEC9] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedTicket ? (
          /* Confirmed QR E-Ticket State */
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-[#2A6F64]/10 border border-[#2A6F64]/30 text-[#1F1A17]">
              <CheckCircle2 className="w-5 h-5 text-[#2A6F64] shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-[#2A6F64]">
                  {lang === 'vi'
                    ? 'Đặt chỗ thành công! Vé điện tử đã được gửi tới email của bạn.'
                    : 'Booking confirmed! Your E-Ticket has been sent to your email.'}
                </p>
                <p className="text-[#5C5346] mt-0.5">
                  {lang === 'vi'
                    ? `Nghệ nhân ${experience.artisanName} đã nhận lịch đón tiếp bạn.`
                    : `Artisan ${experience.artisanName} has been notified of your arrival.`}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-white rounded-xl border border-[#E5DEC9]">
              <div className="space-y-2.5 text-left flex-1">
                <div className="text-xs uppercase tracking-wider text-[#8C4A27] font-semibold">
                  {experience.categoryLabel[lang]} · {experience.locationLabel[lang]}
                </div>
                <h3 className="text-xl font-serif-heritage font-bold text-[#1F1A17]">
                  {experience.title[lang]}
                </h3>
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#5C5346]">
                  <div>
                    <span className="block text-[#8C7A6B]">
                      {lang === 'vi' ? 'Khách đặt:' : 'Guest Name:'}
                    </span>
                    <strong className="text-[#1F1A17] text-sm">{confirmedTicket.fullName}</strong>
                  </div>
                  <div>
                    <span className="block text-[#8C7A6B]">
                      {lang === 'vi' ? 'Ngày & Số khách:' : 'Date & Guests:'}
                    </span>
                    <strong className="text-[#1F1A17] text-sm font-mono-num">
                      {confirmedTicket.date} · {confirmedTicket.guests}{' '}
                      {lang === 'vi' ? 'khách' : 'guests'}
                    </strong>
                  </div>
                  <div>
                    <span className="block text-[#8C7A6B]">
                      {lang === 'vi' ? 'Tổng thanh toán:' : 'Total Paid:'}
                    </span>
                    <strong className="text-[#B8332A] text-sm font-mono-num">
                      {formatVnd(confirmedTicket.totalVnd)}
                    </strong>
                  </div>
                  <div>
                    <span className="block text-[#8C7A6B]">
                      {lang === 'vi' ? 'Đóng góp bảo tồn (85%):' : 'Artisan Fund (85%):'}
                    </span>
                    <strong className="text-[#2A6F64] text-sm font-mono-num">
                      {formatVnd(Math.round(confirmedTicket.totalVnd * 0.85))}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center shrink-0 border-t md:border-t-0 md:border-l border-dashed border-[#D5CBB8] pt-4 md:pt-0 md:pl-6">
                <TicketQrCodeSvg code={confirmedTicket.ticketCode} />
                <span className="mt-2 font-mono-num text-xs font-semibold tracking-wider text-[#1F1A17]">
                  {confirmedTicket.ticketCode}
                </span>
                <span className="text-[11px] text-[#8C7A6B]">
                  {lang === 'vi' ? 'Xuất trình tại làng nghề' : 'Scan at artisan workshop'}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-[#B8332A] hover:bg-[#9E2820] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {lang === 'vi' ? 'Hoàn Tất & Quay Lại' : 'Done & Return'}
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form State */
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6" noValidate>
            {/* Experience Summary Header */}
            <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-[#F3EFEA] border border-[#E5DEC9]">
              <ResilientImage
                src={experience.image}
                alt={experience.title[lang]}
                className="w-full sm:w-28 h-24 object-cover rounded-lg shrink-0"
              />
              <div className="space-y-1">
                <div className="text-xs text-[#8C4A27] font-medium">
                  {experience.categoryLabel[lang]} · {experience.artisanName}
                </div>
                <h3 className="text-base font-serif-heritage font-bold text-[#1F1A17]">
                  {experience.title[lang]}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#5C5346]">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B8332A]" />
                    {experience.locationLabel[lang]}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#8C4A27]" />
                    {experience.durationHours} {lang === 'vi' ? 'giờ' : 'hours'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-num font-semibold text-[#B8332A]">
                    {formatVnd(experience.salePriceVnd)} / {lang === 'vi' ? 'khách' : 'guest'}
                  </span>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div
                role="alert"
                className="p-3.5 rounded-lg bg-[#B8332A]/10 border border-[#B8332A] text-xs font-medium text-[#B8332A]"
              >
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="booking-fullname"
                  className="block text-xs font-semibold text-[#1F1A17] mb-1.5"
                >
                  {lang === 'vi' ? 'Họ và tên người đặt *' : 'Full Name *'}
                </label>
                <input
                  id="booking-fullname"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={lang === 'vi' ? 'VD: Nguyễn Minh Khuê' : 'e.g. Nguyen Minh Khue'}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D5CBB8] rounded-lg focus:outline-none focus:border-[#B8332A]"
                />
              </div>

              <div>
                <label
                  htmlFor="booking-phone"
                  className="block text-xs font-semibold text-[#1F1A17] mb-1.5"
                >
                  {lang === 'vi' ? 'Số điện thoại liên hệ *' : 'Phone Number *'}
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0912 345 678"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D5CBB8] rounded-lg focus:outline-none focus:border-[#B8332A]"
                />
              </div>

              <div>
                <label
                  htmlFor="booking-email"
                  className="block text-xs font-semibold text-[#1F1A17] mb-1.5"
                >
                  {lang === 'vi' ? 'Email nhận vé QR *' : 'Email for QR E-Ticket *'}
                </label>
                <input
                  id="booking-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="khachhang@email.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D5CBB8] rounded-lg focus:outline-none focus:border-[#B8332A]"
                />
              </div>

              <div>
                <label
                  htmlFor="booking-date"
                  className="block text-xs font-semibold text-[#1F1A17] mb-1.5"
                >
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#8C4A27]" />
                    {lang === 'vi' ? 'Ngày trải nghiệm *' : 'Experience Date *'}
                  </span>
                </label>
                <input
                  id="booking-date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D5CBB8] rounded-lg focus:outline-none focus:border-[#B8332A] font-mono-num"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="booking-guests"
                  className="block text-xs font-semibold text-[#1F1A17] mb-1.5"
                >
                  <span className="inline-flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#8C4A27]" />
                    {lang === 'vi' ? 'Số lượng người tham gia' : 'Number of Guests'}
                  </span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    aria-label={lang === 'vi' ? 'Giảm số lượng khách' : 'Decrease guests'}
                    className="w-10 h-10 rounded-lg border border-[#D5CBB8] bg-white hover:bg-[#F3EFEA] font-bold text-[#1F1A17] cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    id="booking-guests"
                    type="number"
                    min={1}
                    max={20}
                    value={guests}
                    onChange={(e) => setGuests(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
                    className="w-20 text-center py-2 text-sm font-mono-num font-semibold bg-white border border-[#D5CBB8] rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(20, g + 1))}
                    aria-label={lang === 'vi' ? 'Tăng số lượng khách' : 'Increase guests'}
                    className="w-10 h-10 rounded-lg border border-[#D5CBB8] bg-white hover:bg-[#F3EFEA] font-bold text-[#1F1A17] cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="booking-voucher"
                  className="block text-xs font-semibold text-[#1F1A17] mb-1.5"
                >
                  {lang === 'vi' ? 'Mã ưu đãi văn hóa (Voucher 15%)' : 'Cultural Promo Code (15% Off)'}
                </label>
                <input
                  id="booking-voucher"
                  type="text"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  placeholder="HERITAGE15"
                  className="w-full px-3.5 py-2.5 text-sm font-mono-num uppercase bg-white border border-[#D5CBB8] rounded-lg focus:outline-none focus:border-[#2A6F64]"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <span className="block text-xs font-semibold text-[#1F1A17] mb-2">
                {lang === 'vi' ? 'Phương thức thanh toán bảo mật' : 'Secure Payment Method'}
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'vietqr', label: 'VietQR / Napas 247' },
                  { id: 'card', label: 'Visa / Mastercard' },
                  { id: 'momo', label: 'Ví MoMo / VNPay' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as 'vietqr' | 'card' | 'momo')}
                    className={`py-2.5 px-3 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap truncate ${
                      paymentMethod === pm.id
                        ? 'bg-[#1F1A17] text-white border-[#1F1A17]'
                        : 'bg-white text-[#5C5346] border-[#D5CBB8] hover:border-[#8C4A27]'
                    }`}
                  >
                    {pm.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Transparent Price Breakdown */}
            <div className="p-4 rounded-lg bg-white border border-[#E5DEC9] space-y-2 text-sm">
              <div className="flex justify-between text-[#5C5346]">
                <span>
                  {formatVnd(experience.salePriceVnd)} × {priceSummary.guests}{' '}
                  {lang === 'vi' ? 'khách' : 'guests'}
                </span>
                <span className="font-mono-num">{formatVnd(priceSummary.subtotalVnd)}</span>
              </div>
              {priceSummary.voucherApplied && (
                <div className="flex justify-between text-[#2A6F64] font-medium">
                  <span>
                    {lang === 'vi'
                      ? 'Ưu đãi cẩm nang văn hóa (HERITAGE15 -15%)'
                      : 'Cultural Guide Voucher (HERITAGE15 -15%)'}
                  </span>
                  <span className="font-mono-num">-{formatVnd(priceSummary.voucherDiscountVnd)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#E5DEC9] flex justify-between items-baseline font-bold text-base text-[#1F1A17]">
                <span>{lang === 'vi' ? 'Tổng thanh toán' : 'Total Payment'}</span>
                <span className="font-mono-num text-lg text-[#B8332A]">
                  {formatVnd(priceSummary.totalVnd)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#2A6F64] pt-1">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {lang === 'vi'
                    ? '85% doanh thu chuyển trực tiếp tới nghệ nhân & quỹ bảo tồn làng nghề'
                    : '85% of revenue goes directly to the artisan & village preservation fund'}
                </span>
                <span className="font-mono-num font-semibold">
                  {formatVnd(priceSummary.artisanContributionVnd)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-[#5C5346] hover:text-[#1F1A17] transition-colors cursor-pointer"
              >
                {lang === 'vi' ? 'Hủy' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#B8332A] hover:bg-[#9E2820] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                {lang === 'vi' ? 'Xác Nhận & Nhận Vé QR' : 'Confirm & Get QR Ticket'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
