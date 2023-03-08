FROM node:18-slim as src

RUN npm i --location=global pm2 ts-node
RUN pm2 install typescript

WORKDIR /app
COPY .husky .
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn run build:clean
