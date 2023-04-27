FROM --platform=linux/amd64 node:alpine

WORKDIR '/app'
ADD . /app

COPY package*.json ./
ENV GENERATE_SOURCEMAP=false
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]