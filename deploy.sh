#!/usr/bin/env bash
set -e
npm install
npm run db:init
npm run build
pm2 start ecosystem.config.cjs --update-env
pm2 save
