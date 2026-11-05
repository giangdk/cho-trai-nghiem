import React from 'react';

/**
 * Line-art Vietnamese Conical Hat (Nón Lá) SVG — for 100% Authentic Artisan USP
 */
export function NonLaIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 8L4 34H44L24 8Z" />
      <path d="M10.5 25.5C15 27.5 33 27.5 37.5 25.5" />
      <path d="M17 17C20 18.2 28 18.2 31 17" />
      <path d="M14 34C14 39.5 18.5 42 24 42C29.5 42 34 39.5 34 34" strokeDasharray="2 2" />
    </svg>
  );
}

/**
 * Line-art Heritage Security Shield & Lotus Seal — for Safe Transaction USP
 */
export function HeritageShieldIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 5L8 11V22.5C8 32.8 14.8 41.2 24 44C33.2 41.2 40 32.8 40 22.5V11L24 5Z" />
      <path d="M24 16C21.5 19.5 20.5 23 24 26.5C27.5 23 26.5 19.5 24 16Z" />
      <path d="M17.5 21C16.5 24 18.5 27 24 27C29.5 27 31.5 24 30.5 21" />
      <path d="M19 31H29" />
    </svg>
  );
}

/**
 * Line-art Traditional Silk Loom Shuttle (Con Thoi Dệt Lụa) — for Sustainable Preservation USP
 */
export function LoomShuttleIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 24C12 13 36 13 42 24C36 35 12 35 6 24Z" />
      <rect x="17" y="21" width="14" height="6" rx="3" />
      <path d="M24 27V38C24 40 26 41 29 41" />
      <circle cx="12" cy="24" r="1.5" fill="currentColor" />
      <circle cx="36" cy="24" r="1.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Subtle Lotus & Đông Sơn Geometric Section Divider
 */
export function LotusDivider({ className = 'w-44 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={className}
      aria-hidden="true"
    >
      <line x1="0" y1="12" x2="74" y2="12" strokeOpacity="0.35" />
      <line x1="126" y1="12" x2="200" y2="12" strokeOpacity="0.35" />
      <path d="M100 3C97 8 95 12 100 17C105 12 103 8 100 3Z" />
      <path d="M92 7C91 11 93 15 100 17C96 13 94 9 92 7Z" />
      <path d="M108 7C109 11 107 15 100 17C104 13 106 9 108 7Z" />
      <circle cx="82" cy="12" r="2" />
      <circle cx="118" cy="12" r="2" />
    </svg>
  );
}

/**
 * Vector Badge: "Đã Thông Báo Bộ Công Thương" (Ministry of Industry and Trade Registered Seal)
 */
export function BoCongThuongBadge({ lang }: { lang: 'vi' | 'en' }) {
  return (
    <div
      className="inline-flex items-center gap-3 px-3.5 py-2 rounded-lg border border-[#D49B35]/40 bg-[#2A231F] text-[#FAF8F5]"
      role="img"
      aria-label={
        lang === 'vi'
          ? 'Chứng nhận Đã thông báo Bộ Công Thương Việt Nam'
          : 'Registered with the Ministry of Industry and Trade of Vietnam'
      }
    >
      <div className="w-8 h-8 rounded-full bg-[#B8332A] flex items-center justify-center shrink-0 border border-[#D49B35]">
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#FAF8F5]" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="text-left leading-tight">
        <div className="text-[10px] tracking-wider uppercase text-[#D49B35] font-semibold">
          {lang === 'vi' ? 'Đã Thông Báo' : 'Official Verified'}
        </div>
        <div className="text-xs font-bold tracking-tight text-white">
          {lang === 'vi' ? 'BỘ CÔNG THƯƠNG' : 'MOIT VIETNAM'}
        </div>
      </div>
    </div>
  );
}

/**
 * Deterministic SVG QR Code Generator for E-Tickets
 */
export function TicketQrCodeSvg({ code }: { code: string }) {
  const size = 11;
  const cells: boolean[][] = [];

  for (let r = 0; r < size; r++) {
    cells[r] = [];
    for (let c = 0; c < size; c++) {
      // Finder pattern corners
      const isTopLeft = r < 3 && c < 3;
      const isTopRight = r < 3 && c >= size - 3;
      const isBottomLeft = r >= size - 3 && c < 3;
      if (isTopLeft || isTopRight || isBottomLeft) {
        cells[r][c] = true;
      } else {
        const charIndex = (r * size + c) % code.length;
        const charCode = code.charCodeAt(charIndex);
        cells[r][c] = (charCode + r * 7 + c * 13) % 2 === 0;
      }
    }
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-28 h-28 p-2 bg-white rounded-lg border border-[#E5DEC9]"
      role="img"
      aria-label={`QR Code ${code}`}
    >
      {cells.map((row, rIdx) =>
        row.map((filled, cIdx) =>
          filled ? (
            <rect
              key={`${rIdx}-${cIdx}`}
              x={cIdx}
              y={rIdx}
              width={0.9}
              height={0.9}
              rx={0.12}
              fill="#1F1A17"
            />
          ) : null
        )
      )}
    </svg>
  );
}
