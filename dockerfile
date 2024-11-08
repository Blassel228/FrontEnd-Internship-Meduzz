FROM node:16-alpine AS build
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build
ENV PORT=3000
ENV HOST=0.0.0.0
CMD ["sh", "-c", "npx nodemon --legacy-watch --watch . --exec 'npm run start' -- --host $HOST --port $PORT"]
