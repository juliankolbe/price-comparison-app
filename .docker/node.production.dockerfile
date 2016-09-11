FROM node:latest

#ENV TZ 'Europe/Berlin'

RUN npm install -g gulp bower nodemon supervisor node-inspector knex

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy soruce code and install app dependencies
COPY . /usr/src/app/
RUN npm install

#Create Symlink to make modules first class
RUN cd node_modules && ln -s ../lib _

# Install Component dependencies
RUN node bin/installcomponents

EXPOSE 8080
CMD [ "npm", "start" ]
