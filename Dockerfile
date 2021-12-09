FROM node:16.13-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16.13-alpine AS server
WORKDIR /app
COPY package* ./
RUN npm install --production
COPY --from=builder ./app/dist ./dist
COPY --from=builder ./app/swagger.yaml .
CMD ["npm", "start"]