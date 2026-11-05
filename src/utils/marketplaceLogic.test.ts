import test from 'node:test';
import assert from 'node:assert/strict';
import { EXPERIENCES } from '../data/heritageData';
import {
  calculateBookingPrice,
  filterExperiences,
  formatVnd,
  generateTicketCode,
  isValidEmail,
  validateBookingInput,
} from './marketplaceLogic';

test('filterExperiences filters accurately by location and category', () => {
  const all = filterExperiences(EXPERIENCES, {
    location: 'all',
    category: 'all',
    searchQuery: '',
  });
  assert.equal(all.length, 6);

  const hanoiCrafts = filterExperiences(EXPERIENCES, {
    location: 'Ha Noi',
    category: 'craft',
    searchQuery: '',
  });
  assert.equal(hanoiCrafts.length, 2);
  assert.ok(hanoiCrafts.every((item) => item.locationId === 'Ha Noi' && item.categoryId === 'craft'));

  const searchResult = filterExperiences(EXPERIENCES, {
    location: 'all',
    category: 'all',
    searchQuery: 'Bát Tràng',
  });
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].id, 'battrang-pottery-master');
});

test('calculateBookingPrice computes subtotal, 15% voucher discount, and 85% artisan allocation', () => {
  const withoutVoucher = calculateBookingPrice(680000, 2, '');
  assert.equal(withoutVoucher.subtotalVnd, 1360000);
  assert.equal(withoutVoucher.voucherDiscountVnd, 0);
  assert.equal(withoutVoucher.totalVnd, 1360000);
  assert.equal(withoutVoucher.voucherApplied, false);
  assert.equal(withoutVoucher.artisanContributionVnd, 1156000);

  const withVoucher = calculateBookingPrice(680000, 2, 'heritage15');
  assert.equal(withVoucher.voucherApplied, true);
  assert.equal(withVoucher.voucherDiscountVnd, 204000);
  assert.equal(withVoucher.totalVnd, 1156000);
});

test('validateBookingInput enforces required fields and valid phone/email formats', () => {
  const missingName = validateBookingInput({
    fullName: ' ',
    phone: '0912345678',
    email: 'khach@honviet.vn',
    date: '2026-11-15',
    guests: 2,
  });
  assert.equal(missingName.valid, false);
  assert.equal(missingName.errorKey, 'name_required');

  const invalidEmail = validateBookingInput({
    fullName: 'Nguyen Van A',
    phone: '0912345678',
    email: 'invalid-email',
    date: '2026-11-15',
    guests: 2,
  });
  assert.equal(invalidEmail.valid, false);
  assert.equal(invalidEmail.errorKey, 'email_invalid');

  const validBooking = validateBookingInput({
    fullName: 'Nguyen Van A',
    phone: '0912345678',
    email: 'khach@honviet.vn',
    date: '2026-11-15',
    guests: 2,
  });
  assert.equal(validBooking.valid, true);
});

test('generateTicketCode and formatVnd produce deterministic formatted output', () => {
  const code1 = generateTicketCode('battrang-pottery-master', 'Nguyen Minh Khue', '2026-11-20');
  const code2 = generateTicketCode('battrang-pottery-master', 'Nguyen Minh Khue', '2026-11-20');
  assert.equal(code1, code2);
  assert.ok(code1.startsWith('HV-BAT-'));
  assert.ok(formatVnd(680000).endsWith('₫'));
});
