FROM node:20 as trasnpiledApi
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Deploy
#FROM node:20
#WORKDIR /usr/src/app
#
#COPY package*.json ./
#RUN npm install --production

EXPOSE 3000
CMD ["node", "app.js"]
