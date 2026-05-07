import { Hono } from "hono";
import type { Env } from './core-utils';
import { InquiryEntity, TextSubscriberEntity, RsvpEntity, AnalyticsEntity, SystemConfigEntity } from "./entities";
import { ok, bad, isStr, notFound } from './core-utils';
import type { InquiryType, AnalyticsEventType } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  app.post('/api/inquiries', async (c) => {
    try {
      const body = await c.req.json();
      const { name, email, phone, type, message } = body;
      if (!isStr(name) || !isStr(email) || !isStr(phone) || !isStr(type)) {
        return bad(c, 'Missing required fields.');
      }
      const validTypes: InquiryType[] = ['reservation', 'vendor', 'sponsor', 'loyalty'];
      if (!validTypes.includes(type as InquiryType)) {
        return bad(c, 'Invalid inquiry type.');
      }
      const inquiry = await InquiryEntity.create(c.env, {
        id: crypto.randomUUID(),
        type: type as InquiryType,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        message: message?.trim() || "",
        createdAt: Date.now(),
      });
      return ok(c, inquiry);
    } catch (e) {
      return bad(c, 'Failed to process inquiry.');
    }
  });
  app.post('/api/text-signup', async (c) => {
    try {
      const { phone } = await c.req.json();
      if (!isStr(phone) || phone.length < 10) {
        return bad(c, 'A valid phone number is required.');
      }
      const sub = await TextSubscriberEntity.create(c.env, {
        id: crypto.randomUUID(),
        phone: phone.trim(),
        createdAt: Date.now(),
      });
      return ok(c, sub);
    } catch (e) {
      return bad(c, 'Failed to process text signup.');
    }
  });
  app.post('/api/rsvps', async (c) => {
    try {
      const body = await c.req.json();
      const { name, email, phone, eventDate } = body;
      if (!isStr(name) || !isStr(email) || !isStr(phone) || !isStr(eventDate)) {
        return bad(c, 'Required RSVP fields missing.');
      }
      const rsvp = await RsvpEntity.create(c.env, {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        eventDate,
        createdAt: Date.now(),
      });
      return ok(c, rsvp);
    } catch (e) {
      return bad(c, 'Failed to save RSVP.');
    }
  });
  app.post('/api/analytics', async (c) => {
    try {
      const body = await c.req.json();
      const { type, target, metadata, sessionId } = body;
      const ev = await AnalyticsEntity.create(c.env, {
        id: crypto.randomUUID(),
        type: type as AnalyticsEventType,
        target: target || "unknown",
        metadata: metadata || {},
        sessionId: sessionId || "anon",
        timestamp: Date.now(),
      });
      return ok(c, ev);
    } catch (e) {
      return bad(c, 'Analytics logging failed.');
    }
  });
  app.get('/api/config/:key', async (c) => {
    const key = c.req.param('key');
    const entity = new SystemConfigEntity(c.env, key);
    const state = await entity.getState();
    if (!state.value) return notFound(c, 'Config key not found');
    return ok(c, state);
  });
  app.get('/api/qr/sponsor', async (c) => {
    // Log the scan
    await AnalyticsEntity.create(c.env, {
      id: crypto.randomUUID(),
      type: 'qr_scan',
      target: 'sponsor_footer',
      timestamp: Date.now(),
    });
    const key = 'sponsor_link';
    const entity = new SystemConfigEntity(c.env, key);
    const config = await entity.getState();
    const destination = config.value || 'https://instagram.com/waybackwednesdays';
    return c.redirect(destination);
  });
}