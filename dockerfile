FROM node:16-alpine AS development
WORKDIR /app
COPY ./app/package*.json /app/
RUN npm install
COPY ./app /app
EXPOSE 3000
RUN npm run build
CMD ["npm", "start"]
