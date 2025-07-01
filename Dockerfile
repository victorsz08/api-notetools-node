FROM node:20-alpine AS build

WORKDIR /app

# Copia schema do Prisma ANTES da instalação (necessário por causa do postinstall)
COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

EXPOSE 8000

CMD ["node", "dist/src/server.js"]