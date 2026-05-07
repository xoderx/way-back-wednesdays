export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type InquiryType = 'reservation' | 'vendor' | 'sponsor' | 'loyalty';
export interface Inquiry {
  id: string;
  type: InquiryType;
  name: string;
  email: string;
  phone: string;
  message?: string;
  createdAt: number;
}
export interface TextSubscriber {
  id: string;
  phone: string;
  createdAt: number;
}
export interface User {
  id: string;
  name: string;
}
export interface RSVP {
  id: string;
  eventDate: string; // ISO String
  name: string;
  email: string;
  phone: string;
  createdAt: number;
}
export type AnalyticsEventType = 'page_view' | 'form_submit' | 'click' | 'qr_scan';
export interface AnalyticsEvent {
  id: string;
  type: AnalyticsEventType;
  target: string;
  metadata?: Record<string, any>;
  sessionId?: string;
  timestamp: number;
}
export interface SystemConfig {
  id: string; // acts as the key (e.g., 'sponsor_link')
  value: string;
}