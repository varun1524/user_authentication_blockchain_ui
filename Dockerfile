FROM node
  
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install fetch-with-proxy
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
ENV DANGEROUSLY_DISABLE_HOST_CHECK true
EXPOSE 3000
CMD [ "npm", "start" ]
