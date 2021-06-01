FROM node:16-alpine

WORKDIR /var/www

COPY package.json ./
RUN npm install --legacy-peer-deps

COPY ./wait-for.sh wait-for.sh
RUN chmod +x wait-for.sh

COPY . .

RUN npm run build

EXPOSE 5000

CMD npm run start
