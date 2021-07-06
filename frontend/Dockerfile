FROM node:14-alpine

# Create app directory
RUN mkdir -p /usr/src/frontend
WORKDIR /usr/src/frontend

# Installing dependencies
COPY package*.json /usr/src/frontend/
RUN yarn install

# Copying source files
COPY . /usr/src/frontend

# Building app
RUN yarn run build
EXPOSE 3000

# Running the app
CMD [ "yarn", "run", "start" ]