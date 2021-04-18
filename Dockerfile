FROM node:lts-alpine3.13

# FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm run build

RUN apt-get update
RUN apt-get install -y xdg-utils
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

RUN xdg-open ./front/index.html
CMD [ "/bin/bash", "npm run test && npm run start" ]
# CMD [ "npm", "start" ]