FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Run migration then start the server
CMD ["sh", "-c", "npm run migration:run && node dist/server.js"]
