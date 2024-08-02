FROM node:20-bookworm-slim AS development

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

RUN yarn global add @nestjs/cli

COPY . .

RUN yarn run build

FROM node:20-bookworm-slim AS production

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

RUN yarn global add @nestjs/cli

COPY --from=development /app/dist ./dist

CMD ["yarn", "run", "start:prod"]