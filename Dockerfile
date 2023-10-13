# Use an official Node.js runtime as a parent image
FROM node:20.5.0

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 4200, which is the default port for Angular development
EXPOSE 4200

# Define the command to start your Angular development server
CMD ["npm", "start"]
