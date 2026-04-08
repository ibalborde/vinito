FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
COPY prisma.config.ts ./

RUN echo 'DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"' > .env
RUN npx prisma generate
RUN rm .env

COPY . .
RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY prisma ./prisma
COPY prisma.config.ts ./

RUN echo 'DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"' > .env
RUN npx prisma generate
RUN rm .env

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]