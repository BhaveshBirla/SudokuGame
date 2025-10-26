# Dockerfile for a generic JavaScript project

# Stage 1: Build the application (if needed)
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock/pnpm-lock.yaml)
COPY package.json ./

# Install dependencies based on the package manager
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
    else npm ci; fi

# Copy the application source code
COPY index.js ./

# Build the application (if a build script exists)
RUN if npm run build; then echo "Build completed successfully"; else echo "No build script found, skipping build"; fi

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

# Copy built artifacts from the builder stage (if any)
COPY --from=builder /app .

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000

# Expose the port
EXPOSE $PORT

# Define a health check (adjust the command as needed)
HEALTHCHECK --interval=5m --timeout=3s CMD curl -f http://localhost:$PORT || exit 1

# Define the command to start the application
CMD ["node", "index.js"]