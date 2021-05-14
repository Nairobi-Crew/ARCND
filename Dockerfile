FROM alpine

RUN apk add --update nodejs npm

WORKDIR /var/www

COPY package*.json ./
RUN npm install

COPY ./utils/wait-for.sh wait-for.sh
RUN chmod +x wait-for.sh

COPY . .

RUN npm run build

EXPOSE 5000

CMD npm run heroku-start
