FROM node:16.8

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install -g serve
RUN npm install --silent
RUN npm install -g create-react-app
# add app
COPY . .
RUN npm run-script build
EXPOSE 5000

# start app
CMD ["serve", "-s", "build"]