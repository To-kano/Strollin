FROM node:14.9.0

WORKDIR /usr/src/app

RUN npm install --global pm2

COPY ./package*.json ./

RUN npm install

ENV PM2_PUBLIC_KEY asccvivffh2e936
ENV PM2_SECRET_KEY w2y37fq4923613e

#--production

COPY . .

EXPOSE 3004

USER node

CMD [ "pm2-runtime", "npm", "--", "start" ]
