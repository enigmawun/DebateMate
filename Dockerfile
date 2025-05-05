# Stage 1: Build the frontend
FROM node:20.18.0 AS builder

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

#STAGE 2: Build the backend

# Expose port 3000
FROM node:20.18.0
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 8080


ENV NODE_ENV=production
# Start the backend server
CMD ["npm", "run", "server"]