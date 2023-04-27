FROM --platform=linux/amd64 node:alpine

WORKDIR '/app'
ADD . /app

COPY package.json .
RUN npm install 
COPY . .
ENV GENERATE_SOURCEMAP=false
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]