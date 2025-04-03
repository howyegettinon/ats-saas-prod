#!/bin/bash

echo "🔄 Starting database fix..."

# Clean previous Prisma state
rm -rf node_modules/.prisma
rm -rf prisma/migrations/*.md

# Reinstall dependencies
npm install @prisma/client @next-auth/prisma-adapter
npm install prisma --save-dev

# Generate Prisma client
npx prisma generate

# Apply migrations
npx prisma migrate reset --force

echo "✨ Done! Database should be fixed."
