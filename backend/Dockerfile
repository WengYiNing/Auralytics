# Use Node.js 18 as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally for live reloading
RUN npm install -g nodemon

# Copy all project files
COPY . .

# Set environment variables
ENV NODE_ENV=development
ENV PORT=8888
ENV REDIS_URL=redis://redis:6379

# Expose API port
EXPOSE 8888

# Enable live reload with nodemon
CMD ["nodemon", "server.js"]
