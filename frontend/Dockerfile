FROM node:18

WORKDIR /usr/src/app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install

CMD ["npm", "start"]