FROM node:20-alpine

WORKDIR /usr/src/app
COPY package*.json .
COPY ./prisma .


RUN npm install
RUN npm run build

COPY . .

RUN npx prisma generate

EXPOSE 8000

CMD  ["npm", "run", "start"]