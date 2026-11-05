export interface TrackingEventRecord {
  id: string;
  eventName: string;
  providers: ('GA4' | 'Meta Pixel' | 'Hotjar')[];
  payload: Record<string, string | number | boolean>;
  timestamp: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    hj?: (...args: unknown[]) => void;
    honVietTrackingLog?: TrackingEventRecord[];
  }
}

/**
 * Dispatches behavioral tracking events to Google Analytics 4, Meta Pixel, and Hotjar
 * while keeping an in-memory log for BA & Marketing verification.
 */
export function trackMarketingEvent(
  eventName: string,
  payload: Record<string, string | number | boolean> = {}
): TrackingEventRecord {
  const record: TrackingEventRecord = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    eventName,
    providers: ['GA4', 'Meta Pixel', 'Hotjar'],
    payload,
    timestamp: new Date().toLocaleTimeString('vi-VN', { hour12: false }),
  };

  if (typeof window !== 'undefined') {
    window.honVietTrackingLog = window.honVietTrackingLog || [];
    window.honVietTrackingLog = [record, ...window.honVietTrackingLog.slice(0, 24)];

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload);
    }
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', eventName, payload);
    }
    if (typeof window.hj === 'function') {
      window.hj('event', eventName);
    }
  }

  return record;
}
