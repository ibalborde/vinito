FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
COPY prisma.config.ts ./

RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" \
    PRISMA_SKIP_DATABASE_CONNECT=true \
    npx prisma generate

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "ls -la && ls dist/ 2>/dev/null || echo 'dist/ NOT FOUND' && npx prisma migrate deploy && node dist/server.js"]
