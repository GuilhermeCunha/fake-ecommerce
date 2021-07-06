FROM node:14-alpine
RUN mkdir -p /usr/src/backend
WORKDIR /usr/src/backend
COPY package.json /usr/src/backend/
RUN yarn install
COPY . /usr/src/backend
EXPOSE 3333
CMD [ "yarn", "start" ]