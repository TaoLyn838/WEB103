# syntax=docker/dockerfile:1

# Use the official Node.js base image
FROM node:22-alpine

# Install bash and curl
RUN apk add --no-cache bash curl

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
ENV PATH="/root/.bun/bin:$PATH"

# Set the environment to production
ENV NODE_ENV=production

# Set the working directory
WORKDIR /usr/src/app

# Copy project files into the working directory
COPY bun.lockb ./
COPY . .

# Install dependencies using Bun
RUN bun install --production

# Expose the port your server will listen on
EXPOSE 3002

# Run the application
CMD ["bun", "run", "start"]
