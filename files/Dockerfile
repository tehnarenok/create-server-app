FROM node:16-alpine

# Creating project folder
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Installing packages
COPY package.json .
RUN npm install

COPY . .

EXPOSE 3000
RUN npm run build
CMD npm run start