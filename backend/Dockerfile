FROM node:20.19-alpine

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

CMD ["sh", "-c", "npx prisma migrate deploy && echo '=== dist contents ===' && ls -la dist/ && echo '=== starting node ===' && node dist/server.js"]
