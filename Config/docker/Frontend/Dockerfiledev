FROM node:22.3.0

WORKDIR /home/web

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "astro", "dev", "--", "--port", "3000", "--host"]