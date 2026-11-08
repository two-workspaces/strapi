# Strapi 5 for Railway: a standard Strapi project, built once at image build.
FROM node:24.22.2-alpine AS build
# upgrade: github strapi/strapi
ARG STRAPI_VERSION=5.61.0
RUN apk add --no-cache build-base python3 vips-dev
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund \
 && test "$(node -p "require('@strapi/strapi/package.json').version")" = "$STRAPI_VERSION"
COPY . .
ENV NODE_ENV=production STRAPI_TELEMETRY_DISABLED=true
RUN npm run build

FROM node:24.22.2-alpine
RUN apk add --no-cache vips su-exec
WORKDIR /app
ENV NODE_ENV=production STRAPI_TELEMETRY_DISABLED=true
COPY --from=build --chown=node:node /app ./
COPY railway-start.sh /railway-start.sh
RUN chmod +x /railway-start.sh
EXPOSE 1337
CMD ["/railway-start.sh"]
