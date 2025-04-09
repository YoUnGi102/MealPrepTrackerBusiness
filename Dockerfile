# Step 1: Use the specific Node.js version (v22.14.0) as the base image
FROM node:22.14.0-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies (npm install)
RUN npm install

# Step 5: Copy all files into the container
COPY . .

# Step 6: Expose the port your app will run on
EXPOSE 5000

# Step 7: Start the application (assuming entry point is `server.js`)
CMD ["node", "server.ts"]
