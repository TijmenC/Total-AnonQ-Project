FROM node:13.12.0-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY anonq-adminpanel/package.json ./
COPY anonq-adminpanel/package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g
COPY anonq-adminpanel ./
CMD ["npm", "start"]