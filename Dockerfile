FROM node:20-alpine

# 🔥 DNS Fix - MongoDB Atlas SRV records ke liye zaroori
RUN echo "nameserver 8.8.8.8" > /etc/resolv.conf && \
    echo "nameserver 1.1.1.1" >> /etc/resolv.conf

WORKDIR /app

# Package files copy karein
COPY package*.json ./

# Dependencies install karein
RUN npm install --production

# Source code copy karein
COPY . .

# Port expose karein
EXPOSE 3000

# Server start karein
CMD ["npm", "start"]