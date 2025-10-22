# Inner Voice Frontend - Production Dockerfile
# Multi-stage build with Vite + Nginx

# ==========================================
# Stage 1: Build Stage
# ==========================================
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY ../package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY ../ ./

# Build the application with Vite
RUN npm run build

# ==========================================
# Stage 2: Production Stage with Nginx
# ==========================================
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create nginx user for security
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
