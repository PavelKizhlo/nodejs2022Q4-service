FROM --platform=linux/amd64 node:18-alpine3.17

WORKDIR /usr/app
COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

CMD ["npm", "run", "start:dev"]
