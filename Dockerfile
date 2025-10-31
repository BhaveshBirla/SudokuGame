# Dockerfile for Node.js application

# Use a multi-stage build to optimize image size

# --- Builder Stage ---
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock/pnpm-lock.yaml
COPY package.json ./

# Install dependencies based on the package manager used
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
    else npm ci; fi

# Copy source code
COPY index.js ./

# --- Production Stage ---
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy built artifacts from builder stage
COPY --from=builder /app ./

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000

# Expose the port the app runs on
EXPOSE 3000

# Define health check
HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost:$PORT || exit 1

# Define command to start the app
CMD ["node", "index.js"]