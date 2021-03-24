FROM node:12
COPY . /
RUN npm i && npm run build
EXPOSE 80
CMD node server.js
