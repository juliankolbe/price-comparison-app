FROM node:latest

ENV TZ 'Europe/Berlin'

RUN npm install -g gulp bower nodemon supervisor node-inspector knex

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

#Create Symlink to make modules first class
RUN cd node_modules && ln -s ../lib _

# Bundle app source
COPY . /usr/src/app

# Install Component dependencies
RUN node bin/installcomponents

#Run setup bash script
#RUN /bin/dev_start.sh

EXPOSE 8080
CMD [ "npm", "start" ]
