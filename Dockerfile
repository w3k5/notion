FROM node:14-alpine
WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build
