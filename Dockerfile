# Build stage
FROM node:14.16.0-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM python:3.8.8-slim-buster as production-stage
WORKDIR /app
COPY --from=build-stage /app/dist /app/dist
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py ./
CMD ["python", "app.py"]
