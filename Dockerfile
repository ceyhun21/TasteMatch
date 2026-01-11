FROM node:18-alpine

LABEL maintainer="TasteMatch Team"
LABEL description="TasteMatch - Restaurant Discovery App with Tinder-style Swiping"

WORKDIR /app

# Copy application files
COPY index.html admin.html ./
COPY docs/ ./docs/
COPY *.json ./
COPY *.md ./

# Install http-server globally for serving static files
RUN npm install -g http-server --silent

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8000/ || exit 1

# Expose port
EXPOSE 8000

# Environment
ENV NODE_ENV=production
ENV PORT=8000

# Start server
CMD ["http-server", "-p", "8000", "-c-1", "--cors"]
