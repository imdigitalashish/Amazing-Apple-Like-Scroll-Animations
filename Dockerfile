FROM node

WORKDIR /app

COPY . .

RUN npm install


EXPOSE 5173

CMD [ "npm", "run", "dev" ]