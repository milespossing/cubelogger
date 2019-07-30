FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["export", "NODE_ENV=default"]

CMD ["node", "app.js"]
