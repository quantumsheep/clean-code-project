FROM node:14-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY src src
COPY tsconfig.json .

RUN npm run build

FROM node:14-alpine

COPY package*.json ./
COPY --from=build /usr/src/app/dist/* ./

RUN npm ci --only=production

CMD npm run start
