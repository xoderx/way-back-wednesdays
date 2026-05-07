import { IndexedEntity } from "./core-utils";
import type { Inquiry, TextSubscriber, RSVP, AnalyticsEvent, SystemConfig } from "@shared/types";
export class InquiryEntity extends IndexedEntity<Inquiry> {
  static readonly entityName = "inquiry";
  static readonly indexName = "inquiries";
  static readonly initialState: Inquiry = {
    id: "",
    type: "reservation",
    name: "",
    email: "",
    phone: "",
    message: "",
    createdAt: 0,
  };
}
export class TextSubscriberEntity extends IndexedEntity<TextSubscriber> {
  static readonly entityName = "text-subscriber";
  static readonly indexName = "text-subscribers";
  static readonly initialState: TextSubscriber = {
    id: "",
    phone: "",
    createdAt: 0,
  };
}
export class RsvpEntity extends IndexedEntity<RSVP> {
  static readonly entityName = "rsvp";
  static readonly indexName = "rsvps";
  static readonly initialState: RSVP = {
    id: "",
    eventDate: "",
    name: "",
    email: "",
    phone: "",
    createdAt: 0,
  };
}
export class AnalyticsEntity extends IndexedEntity<AnalyticsEvent> {
  static readonly entityName = "analytics-event";
  static readonly indexName = "analytics-events";
  static readonly initialState: AnalyticsEvent = {
    id: "",
    type: "page_view",
    target: "",
    timestamp: 0,
  };
}
export class SystemConfigEntity extends IndexedEntity<SystemConfig> {
  static readonly entityName = "system-config";
  static readonly indexName = "system-configs";
  static readonly initialState: SystemConfig = {
    id: "",
    value: "",
  };
}