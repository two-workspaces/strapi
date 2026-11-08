import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // The public URL, so the admin panel, media URLs and emails use the
  // Railway domain (or your custom one) instead of localhost.
  url: env('PUBLIC_URL', ''),
  // Railway terminates TLS at its edge: trust X-Forwarded-Proto so secure
  // admin cookies are set.
  proxy: { koa: env.bool('IS_PROXIED', true) },
  app: {
    keys: env.array('APP_KEYS')!,
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});

export default config;
