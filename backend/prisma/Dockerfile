FROM node:18

WORKDIR /usr/src/app

RUN npm init -y
RUN npm install prisma

CMD [ "npx", "prisma", "studio" ]