import { CategoryId, ExperienceItem, LocationId } from '../data/heritageData';

export interface FilterCriteria {
  location: LocationId;
  category: CategoryId;
  searchQuery: string;
  date?: string;
}

export interface BookingPriceSummary {
  unitPriceVnd: number;
  guests: number;
  subtotalVnd: number;
  voucherDiscountVnd: number;
  totalVnd: number;
  artisanContributionVnd: number;
  voucherApplied: boolean;
}

export interface BookingFormInput {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  guests: number;
  voucherCode?: string;
}

export interface ValidationResult {
  valid: boolean;
  errorKey?: 'name_required' | 'phone_invalid' | 'email_invalid' | 'date_required' | 'guests_invalid';
}

/**
 * Filters experiences by location, category, and free-text query across both Vietnamese and English fields.
 */
export function filterExperiences(
  items: ExperienceItem[],
  criteria: FilterCriteria
): ExperienceItem[] {
  const normalizedQuery = criteria.searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    if (criteria.location !== 'all' && item.locationId !== criteria.location) {
      return false;
    }
    if (criteria.category !== 'all' && item.categoryId !== criteria.category) {
      return false;
    }
    if (normalizedQuery.length > 0) {
      const searchableText = [
        item.title.vi,
        item.title.en,
        item.locationLabel.vi,
        item.locationLabel.en,
        item.categoryLabel.vi,
        item.categoryLabel.en,
        item.artisanName,
        item.summary.vi,
        item.summary.en,
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    }
    return true;
  });
}

/**
 * Formats VND currency cleanly with tabular precision (e.g. 680.000₫)
 */
export function formatVnd(amount: number): string {
  const rounded = Math.max(0, Math.round(amount));
  return `${rounded.toLocaleString('vi-VN')}₫`;
}

/**
 * Calculates transparent booking breakdown including 15% newsletter voucher (HERITAGE15)
 * and 85% direct artisan preservation fund allocation.
 */
export function calculateBookingPrice(
  unitPriceVnd: number,
  guests: number,
  voucherCode?: string
): BookingPriceSummary {
  const safeGuests = Math.max(1, Math.min(20, Math.floor(guests || 1)));
  const subtotalVnd = unitPriceVnd * safeGuests;
  const normalizedCode = (voucherCode || '').trim().toUpperCase();
  const voucherApplied = normalizedCode === 'HERITAGE15' || normalizedCode === 'HONVIET15';
  const voucherDiscountVnd = voucherApplied ? Math.round(subtotalVnd * 0.15) : 0;
  const totalVnd = subtotalVnd - voucherDiscountVnd;
  const artisanContributionVnd = Math.round(totalVnd * 0.85);

  return {
    unitPriceVnd,
    guests: safeGuests,
    subtotalVnd,
    voucherDiscountVnd,
    totalVnd,
    artisanContributionVnd,
    voucherApplied,
  };
}

/**
 * Validates newsletter email address
 */
export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

/**
 * Validates booking form inputs without silently substituting fallback values
 */
export function validateBookingInput(input: BookingFormInput): ValidationResult {
  if (!input.fullName || input.fullName.trim().length < 2) {
    return { valid: false, errorKey: 'name_required' };
  }
  const cleanedPhone = input.phone.replace(/[\s\-().]/g, '');
  if (!/^\+?[0-9]{8,15}$/.test(cleanedPhone)) {
    return { valid: false, errorKey: 'phone_invalid' };
  }
  if (!isValidEmail(input.email)) {
    return { valid: false, errorKey: 'email_invalid' };
  }
  if (!input.date || input.date.trim().length === 0) {
    return { valid: false, errorKey: 'date_required' };
  }
  if (!Number.isFinite(input.guests) || input.guests < 1 || input.guests > 20) {
    return { valid: false, errorKey: 'guests_invalid' };
  }
  return { valid: true };
}

/**
 * Generates a deterministic E-Ticket reference code from experience ID and customer info
 */
export function generateTicketCode(experienceId: string, fullName: string, date: string): string {
  const prefix = experienceId.slice(0, 3).toUpperCase();
  const seedStr = `${experienceId}-${fullName.trim().toUpperCase()}-${date}`;
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash * 31 + seedStr.charCodeAt(i)) % 1000000;
  }
  const padded = String(Math.abs(hash)).padStart(6, '0');
  return `HV-${prefix}-${padded}`;
}
