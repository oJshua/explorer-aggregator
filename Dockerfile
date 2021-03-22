FROM node:14.16.0-alpine AS build

WORKDIR /build

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY tsoa.json .

RUN npm install --loglevel verbose

COPY ./src ./src
RUN npm run build

FROM node:14.16.0-alpine

WORKDIR /app

COPY --from=build /build/dist ./dist
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/package.json .

CMD ["npm", "start"]
