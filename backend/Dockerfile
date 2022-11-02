FROM node:18

WORKDIR /usr/src/app

RUN apt-get update \
    && apt-get install -y chromium \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium

COPY prisma .
COPY package*.json .
COPY tsconfig.json .

CMD [ "npm", "run", "start" ]
