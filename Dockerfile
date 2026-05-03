FROM node:20-alpine

WORKDIR /app

# Copy package files and install ALL dependencies (including devDeps needed for build)
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the Vite app (produces the dist/ folder)
RUN npm run build

# Remove dev dependencies after build to keep image slim
RUN npm prune --production

ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]