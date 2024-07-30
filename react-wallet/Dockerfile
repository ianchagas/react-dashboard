FROM node:22-alpine

WORKDIR /usr/app/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

CMD ["npm", "start"]