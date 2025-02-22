# Get the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies, including devDependencies
RUN npm install -g nodemon && npm install


# Copy the source code
COPY . .

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
