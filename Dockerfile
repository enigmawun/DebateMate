# Stage 1: Build the backend
FROM node:23.3.0 AS build

# Set working directory
WORKDIR /app

# Copy package files and install all dependencies (including devDependencies)
COPY package.json package-lock.json tsconfig.json ./
RUN npm ci

# Copy backend source code
COPY ./server ./server
COPY ./types ./types

# Compile TypeScript to JavaScript
RUN npx tsc

# Stage 2: Run the backend
FROM node:23.3.0

# Set working directory
WORKDIR /app

# Copy package files and install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy compiled JavaScript from the build stage
COPY --from=build /app/dist ./dist

RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the backend server
CMD ["npm", "run", "server"]