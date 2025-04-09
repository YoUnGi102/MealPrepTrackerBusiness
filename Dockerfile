FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build TypeScript to JavaScript
RUN npm run build

EXPOSE 3000

# Start the app from dist
CMD ["node", "dist/server.js"]
