
FROM node:17-alpine3.12 AS production

# setup working directory
WORKDIR '/usr/src/app/api'

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/api/node_modules/.bin:$PATH

# install and cache app dependencies
ADD package.json /usr/src/app/api/package.json
COPY yarn.lock /usr/src/app/api/

RUN yarn install --silent

# add app
ADD . /usr/src/app/api

# start app
CMD ["yarn", "start:prod"]