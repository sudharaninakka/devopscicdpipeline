FROM node:16.0.0
WORKDIR /var/www/FinSecOps/
COPY . .
RUN npm install
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
