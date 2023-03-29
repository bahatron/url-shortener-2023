FROM node:18-slim as src

RUN apt-get update && apt-get install -y curl
RUN npm i --location=global pm2 ts-node
RUN pm2 install typescript

WORKDIR /app
COPY package*.json ./
COPY .husky .
RUN npm ci
COPY . .
RUN npm run build:clean
