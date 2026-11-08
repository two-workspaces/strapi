# Deploy and Host Strapi on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/strapi-server?referralCode=sLjDXb&utm_medium=integration&utm_source=button&utm_campaign=strapi-server)

[Strapi](https://github.com/strapi/strapi) is the leading open-source headless CMS. You model content types in the admin panel, editors fill them in, and Strapi serves them through a REST API (GraphQL with a plugin) to any website, app or static-site build. This template runs Strapi 5 in production mode on Postgres, with Media Library uploads on a volume and the super admin created on first boot.

## About Hosting Strapi

Two services: Strapi (the admin panel and the API) and Postgres (content, users, settings). Uploads from the Media Library go to a volume at `/data`, so images and files survive redeploys.

A fresh Strapi shows a "create the first administrator" form at `/admin` to whoever opens it first. This template creates that account on first boot from `STRAPI_ADMIN_EMAIL` and `STRAPI_ADMIN_PASSWORD` instead, so the form is never offered. Every secret (`APP_KEYS`, the JWT secrets, token salts and the encryption key) is generated per deploy.

## Common Use Cases

- A content backend for a Next.js, Nuxt, Astro, SvelteKit or mobile app
- A blog, docs or marketing site where editors work in the admin panel and developers fetch JSON
- Multi-language content with Strapi's built-in internationalization
- A user and permissions API (sign-up, login, roles) for an app's end users

## Dependencies for Strapi Hosting

- Nothing else is required. Add an email provider or a storage provider plugin when you need them.

### Deployment Dependencies

- [Strapi on GitHub](https://github.com/strapi/strapi)
- [Strapi documentation](https://docs.strapi.io)
- [Template source on GitHub](https://github.com/two-workspaces/strapi)

### Implementation Details

**First use:**

1. Open the Strapi service's domain at `/admin` once it's green.
2. Log in with `STRAPI_ADMIN_EMAIL` (by default `admin@` your Railway domain) and `STRAPI_ADMIN_PASSWORD` from the Variables tab.
3. Change the email and password under your profile, top right.
4. To call the API, create a token under **Settings → API Tokens**, or allow public read access per content type under **Settings → Users & Permissions → Roles → Public**.

```bash
curl https://<your-domain>/api/articles -H "Authorization: Bearer <api token>"
```

**Adding content types:** Strapi only allows the Content-Type Builder in development mode, because content types are code in `src/api`. In Railway, open the Strapi service's **Settings → Source** and eject to get your own copy of this repository. Clone it, run `npm install` and `npm run develop` locally, build your content types, and push: Railway rebuilds with them. Content you enter in production stays in Postgres.

**Plugins** (GraphQL, SEO, an S3 or Cloudinary upload provider, an email provider) are added the same way: `npm install` them in your copy and push.

Notes and limits:

- The admin variables only matter on first boot. Change the password in Strapi afterwards.
- Keep `ENCRYPTION_KEY`, `API_TOKEN_SALT` and `APP_KEYS` unchanged: changing them breaks stored secrets, API tokens or sessions.
- Set `PUBLIC_URL` to your custom domain when you add one, so media URLs and the admin panel use it.
- About 250 MB of RAM for Strapi and 50-100 MB for Postgres at idle. Builds take a few minutes, since the admin panel is compiled at build time.
- Each template update moves to a newer Strapi release. Back up Postgres (Railway backups) before updating.

## Why Deploy Strapi on Railway?

Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

By deploying Strapi on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.
