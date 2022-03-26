FROM node:16.14.2 

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

# Install app dependencies
RUN yarn install --pure-lockfile

COPY . .

RUN yarn build

CMD [ "yarn", "start" ]