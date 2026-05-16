# Production stage using pre-built files
FROM node:20-slim

WORKDIR /app

# Copy backend package files for dependency installation
COPY backend/package*.json ./backend/

# Install only production dependencies for the backend
RUN cd backend && npm install --production

# Copy the pre-built dist folders from local
COPY backend/dist ./backend/dist
COPY frontend/dist ./frontend/dist
COPY backend/src/data ./backend/dist/data
COPY backend/service-account-key.json ./backend/

# Environment variables
ENV PORT=8080
ENV NODE_ENV=production
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/backend/service-account-key.json
ENV GOOGLE_CLOUD_PROJECT=virtual-promptwars-493116

# Expose the port
EXPOSE 8080

# Start the application
CMD ["node", "backend/dist/index.js"]
