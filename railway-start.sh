#!/bin/sh
# Railway start for Strapi.
set -e

# Media Library uploads live on the volume at /data, so they survive redeploys.
# Railway mounts it owned by root; Strapi runs as the node user.
if [ -d /data ]; then
  mkdir -p /data/uploads
  chown -R node:node /data
  rm -rf /app/public/uploads
  ln -s /data/uploads /app/public/uploads
fi

exec su-exec node npm run start
