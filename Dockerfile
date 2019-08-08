FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["export", "NODE_ENV=production"]

CMD ["node", "app.js"]
