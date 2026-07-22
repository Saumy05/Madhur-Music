#!/usr/bin/env bash

# Copy .env.example files to .env in web and server apps if they don't exist

if [ ! -f "apps/web/.env" ]; then
  cp apps/web/.env.example apps/web/.env
  echo "[+] Created apps/web/.env"
fi

if [ ! -f "apps/server/.env" ]; then
  cp apps/server/.env.example apps/server/.env
  echo "[+] Created apps/server/.env"
fi

echo "[✓] Environment setup completed."
