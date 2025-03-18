# Stage 1: Build the backend
FROM node:20.18.0

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Ensure correct permissions and file existence
RUN chmod -R 755 /app && \
    ls -la /app/client/assets

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the backend server
CMD ["npm", "run", "start"]