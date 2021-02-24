FROM node:12.18.3
WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
ENTRYPOINT ["node", "./server/server.js"]