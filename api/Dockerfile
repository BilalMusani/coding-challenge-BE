
FROM node:17-alpine3.12 AS development

WORKDIR /usr/src/app/api

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --development

COPY . .

CMD ["npm", "start"]

# RUN npm run test && npm run test:e2e

FROM node:17-alpine3.12 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/api

COPY package*.json ./

RUN npm ci --production

COPY . .

# COPY --from=development /usr/src/app/dist ./dist

CMD ["npm", "start"]