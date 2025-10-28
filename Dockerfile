# Dockerfile for Node.js application

# Use a multi-stage build to optimize image size
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock/pnpm-lock.yaml)
COPY package.json ./

# Install dependencies based on the package manager used
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
    else npm ci --only=production; fi

# Copy source code
COPY index.js ./

# Build the application (if needed - adjust command based on your project)
#RUN npm run build

# --- Production Stage ---
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy built artifacts from the builder stage
COPY --from=builder /app ./

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000

# Expose the port the app runs on
EXPOSE $PORT

# Define health check (adjust based on your application's health endpoint)
HEALTHCHECK --interval=5m --timeout=3s --retries=3 CMD curl -f http://localhost:$PORT || exit 1

# Define command to start the application
CMD ["node", "index.js"]