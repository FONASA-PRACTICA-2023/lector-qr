# pull official base image
FROM node:18.3.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# a default value
ENV NODE_OPTIONS=--openssl-legacy-provider

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --legacy-peer-deps
RUN npm install react-scripts@4.0.1 -g

# add app
COPY . ./

# start app
CMD ["npm", "start"]