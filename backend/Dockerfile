FROM node:20.18-alpine

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
RUN ls dist/server.js || (echo "BUILD FAILED" && exit 1)

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js 2>&1 || echo 'NODE FAILED WITH EXIT CODE '$?"]