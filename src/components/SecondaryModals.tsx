import React from 'react';
import { Activity, FileText, ShieldCheck, Ticket, X } from 'lucide-react';
import { Language } from '../data/heritageData';
import { ConfirmedBooking } from './BookingModal';
import { TicketQrCodeSvg } from './HeritageIcons';
import { formatVnd } from '../utils/marketplaceLogic';
import { TrackingEventRecord } from '../utils/tracking';

interface MyBookingsModalProps {
  isOpen: boolean;
  lang: Language;
  bookings: ConfirmedBooking[];
  onClose: () => void;
}

export function MyBookingsModal({ isOpen, lang, bookings, onClose }: MyBookingsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="my-bookings-title"
    >
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E5DEC9] rounded-xl shadow-2xl overflow-hidden my-8">
        <div className="flex items-center justify-between px-6 py-4 bg-[#1F1A17] text-white">
          <div className="flex items-center gap-2.5">
            <Ticket className="w-5 h-5 text-[#D49B35]" />
            <h2 id="my-bookings-title" className="text-lg font-serif-heritage font-semibold">
              {lang === 'vi'
                ? `Vé Điện Tử QR Đã Đặt (${bookings.length})`
                : `My Confirmed QR E-Tickets (${bookings.length})`}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={lang === 'vi' ? 'Đóng danh sách vé' : 'Close tickets modal'}
            className="p-1.5 rounded-lg text-[#E5DEC9] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {bookings.map((b) => (
            <div
              key={b.ticketCode}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-[#E5DEC9]"
            >
              <div className="space-y-1.5 text-left flex-1">
                <div className="text-xs font-mono-num font-bold text-[#2A6F64]">
                  {b.ticketCode} · {b.date}
                </div>
                <h3 className="text-base font-serif-heritage font-bold text-[#1F1A17]">
                  {b.experience.title[lang]}
                </h3>
                <div className="text-xs text-[#5C5346]">
                  {b.fullName} · {b.guests} {lang === 'vi' ? 'khách' : 'guests'} ·{' '}
                  <strong className="font-mono-num text-[#B8332A]">{formatVnd(b.totalVnd)}</strong>
                </div>
              </div>
              <div className="shrink-0">
                <TicketQrCodeSvg code={b.ticketCode} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface PolicyAndTrackingModalProps {
  activeTab: 'privacy' | 'refund' | 'terms' | 'tracking' | null;
  lang: Language;
  onSelectTab: (tab: 'privacy' | 'refund' | 'terms' | 'tracking') => void;
  onClose: () => void;
}

export function PolicyAndTrackingModal({
  activeTab,
  lang,
  onSelectTab,
  onClose,
}: PolicyAndTrackingModalProps) {
  if (!activeTab) return null;

  const events: TrackingEventRecord[] =
    (typeof window !== 'undefined' && window.honVietTrackingLog) || [];

  const tabs: { id: 'privacy' | 'refund' | 'terms' | 'tracking'; label: { vi: string; en: string } }[] = [
    { id: 'privacy', label: { vi: 'Bảo mật', en: 'Privacy' } },
    { id: 'refund', label: { vi: 'Hoàn hủy 24h', en: '24h Refund' } },
    { id: 'terms', label: { vi: 'Điều khoản', en: 'Terms' } },
    { id: 'tracking', label: { vi: 'GA4 · Pixel · Hotjar', en: 'GA4 · Pixel · Hotjar' } },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E5DEC9] rounded-xl shadow-2xl overflow-hidden my-8">
        <div className="flex items-center justify-between px-6 py-4 bg-[#1F1A17] text-white">
          <div className="flex items-center gap-2.5">
            {activeTab === 'tracking' ? (
              <Activity className="w-5 h-5 text-[#D49B35]" />
            ) : (
              <FileText className="w-5 h-5 text-[#D49B35]" />
            )}
            <h2 id="policy-modal-title" className="text-lg font-serif-heritage font-semibold">
              {lang === 'vi'
                ? 'Chính Sách Minh Bạch & Cấu Hình Đo Lường'
                : 'Transparency Policies & Marketing Tracking'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={lang === 'vi' ? 'Đóng cửa sổ chính sách' : 'Close policy modal'}
            className="p-1.5 rounded-lg text-[#E5DEC9] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-1.5 px-6 pt-4 border-b border-[#E5DEC9] bg-[#F3EFEA]">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelectTab(t.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === t.id
                  ? 'bg-[#FAF8F5] text-[#B8332A] border border-b-0 border-[#E5DEC9]'
                  : 'text-[#5C5346] hover:text-[#1F1A17]'
              }`}
            >
              {t.label[lang]}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-4 text-sm text-[#1F1A17] max-h-[70vh] overflow-y-auto leading-relaxed">
          {activeTab === 'privacy' && (
            <div className="space-y-3">
              <h3 className="text-lg font-serif-heritage font-bold">
                {lang === 'vi' ? 'Chính Sách Bảo Mật Thông Tin Cá Nhân' : 'Personal Data Privacy Policy'}
              </h3>
              <p className="text-[#5C5346]">
                {lang === 'vi'
                  ? 'Hồn Việt tuân thủ Nghị định 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân. Thông tin họ tên, số điện thoại và email của quý khách chỉ được sử dụng để phát hành mã vé QR và kết nối với gia đình nghệ nhân đón tiếp.'
                  : 'Hon Viet strictly complies with Decree 13/2023/ND-CP on Personal Data Protection. Your name, phone number, and email are used solely to issue your QR E-Ticket and coordinate your arrival with the host artisan family.'}
              </p>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-3">
              <h3 className="text-lg font-serif-heritage font-bold">
                {lang === 'vi'
                  ? 'Chính Sách Hoàn Hủy & Đổi Lịch Linh Hoạt'
                  : '24-Hour Free Cancellation & Rescheduling'}
              </h3>
              <p className="text-[#5C5346]">
                {lang === 'vi'
                  ? 'Hoàn tiền 100% hoặc đổi ngày miễn phí khi thông báo trước giờ khởi hành tối thiểu 24 giờ để nghệ nhân kịp chuẩn bị nguyên liệu thủ công (đất sét, tơ tằm, lá sen tươi).'
                  : 'Receive a 100% full refund or complimentary date change when requested at least 24 hours before your scheduled workshop time.'}
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-3">
              <h3 className="text-lg font-serif-heritage font-bold">
                {lang === 'vi'
                  ? 'Điều Khoản Dịch Vụ & Quy Tắc Ứng Xử Di Sản'
                  : 'Terms of Service & Cultural Etiquette'}
              </h3>
              <p className="text-[#5C5346]">
                {lang === 'vi'
                  ? 'Du khách tham gia trải nghiệm tại không gian nhà thờ tổ, đình làng hoặc xưởng cổ vui lòng giữ gìn sự tôn nghiêm, trang phục lịch sự và tôn trọng quy trình truyền nghề của nghệ nhân.'
                  : 'Guests visiting ancestral family courtyards, communal pavilions, and heritage kilns are kindly asked to dress respectfully and honor local craft traditions.'}
              </p>
            </div>
          )}

          {activeTab === 'tracking' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-serif-heritage font-bold">
                  {lang === 'vi'
                    ? 'Trạng Thái Tích Hợp GA4 · Meta Pixel · Hotjar'
                    : 'Active Marketing & Heatmap Integrations'}
                </h3>
                <span className="text-xs font-mono-num text-[#2A6F64] font-semibold">
                  G-HONVIET2026 · ACTIVE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-white border border-[#E5DEC9]">
                  <div className="font-bold text-[#1F1A17]">Google Analytics 4</div>
                  <div className="text-[#5C5346] mt-0.5">window.gtag / dataLayer</div>
                </div>
                <div className="p-3 rounded-lg bg-white border border-[#E5DEC9]">
                  <div className="font-bold text-[#1F1A17]">Meta Pixel</div>
                  <div className="text-[#5C5346] mt-0.5">window.fbq Custom Events</div>
                </div>
                <div className="p-3 rounded-lg bg-white border border-[#E5DEC9]">
                  <div className="font-bold text-[#1F1A17]">Hotjar Heatmap</div>
                  <div className="text-[#5C5346] mt-0.5">window.hj Behavioral Triggers</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#5C5346]">
                  {lang === 'vi'
                    ? `Nhật ký sự kiện phiên hiện tại (${events.length}):`
                    : `Session Event Stream (${events.length}):`}
                </div>
                <div className="p-3 rounded-lg bg-[#1F1A17] text-[#E5DEC9] font-mono-num text-xs space-y-1.5 max-h-40 overflow-y-auto">
                  {events.length === 0 ? (
                    <div className="text-[#8C7A6B]">
                      {lang === 'vi'
                        ? 'Đã khởi tạo page_view. Hãy thử lọc danh mục hoặc đặt vé để xem sự kiện.'
                        : 'page_view initialized. Filter categories or book a ticket to inspect events.'}
                    </div>
                  ) : (
                    events.map((ev) => (
                      <div key={ev.id} className="border-b border-white/10 pb-1">
                        <span className="text-[#D49B35]">[{ev.timestamp}]</span>{' '}
                        <strong className="text-white">{ev.eventName}</strong>{' '}
                        <span className="text-[#B8ACA0]">{JSON.stringify(ev.payload)}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
