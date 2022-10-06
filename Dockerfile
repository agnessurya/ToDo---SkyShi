FROM node:16.13

WORKDIR /usr/local/user

COPY package.json package-lock.json /usr/local/user/

RUN npm install && npm cache clean --force 
RUN npm i -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]
