FROM node:latest

WORKDIR /usr/app

#COPY ./deploymentsTest/haproxy.cfg .


COPY package.json .
RUN npm install --quiet

COPY . .
