FROM --platform=linux/amd64 node:18-alpine3.17

WORKDIR /usr/app
COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

#If you are on Windows, disable WSL and use Hyper-V instead. WSL2 doesn't work with hot reload.
CMD ["npm", "run", "start:dev"]

#You can also use nodemon for hot reload. To do this, uncomment the line below and remove previous CMD
#CMD ["npm", "run", "start:dev-nodemon"]
