FROM node:lts-buster

WORKDIR /usr/src/applicable
COPY package*.json ./

RUN npm install --only=production

COPY . .

CMD ["node", "src"]
