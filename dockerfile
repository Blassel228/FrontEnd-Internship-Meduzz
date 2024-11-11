FROM node:16-alpine AS base
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
ENV PORT=3000
ENV HOST=0.0.0.0
EXPOSE $PORT

FROM base AS dev
RUN npm install --save-dev nodemon
CMD ["sh", "-c", "npx nodemon --legacy-watch --watch src --ext js,jsx,ts,tsx,json --exec 'npm run start' -- --host $HOST --port $PORT"]

FROM base AS production
RUN npm run build
ENV NODE_ENV=production
CMD ["npm", "run", "start", "--", "--host", "$HOST", "--port", "$PORT"]
