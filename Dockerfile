# Stage 1: Build the backend
FROM node:20.18.0

# Set working directory
WORKDIR /app

# Copy package files and install all dependencies (including devDependencies)
COPY package.json package-lock.json tsconfig.json ./
RUN npm ci

# Copy backend source code
COPY ./server ./server
COPY ./types ./types

# Copy compiled JavaScript from the build stage
COPY --from=build /app/dist ./dist

RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the backend server
CMD ["npm", "run", "start"]