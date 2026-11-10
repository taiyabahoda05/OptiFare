FROM node:22-slim

WORKDIR /app

# Install Python and pip
RUN apt-get update && apt-get install -y python3 python3-pip python-is-python3 \
    && rm -rf /var/lib/apt/lists/*

# Install Node dependencies
COPY package*.json ./
RUN npm install

# Install Python dependencies
COPY requirements.txt ./
RUN pip3 install --break-system-packages -r requirements.txt

# Copy application files
COPY . .

# Build Next.js
RUN npm run build

EXPOSE 10000

CMD ["npm", "start"]