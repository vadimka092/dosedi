FROM node:20.11.1-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY app.js ./
COPY views ./views
COPY data ./data

# Разрешаем пользователю node (от имени которого запускается приложение) 
# читать и писать в папку /app и её подпапки
RUN chown -R node:node /app

ENV NODE_ENV=production
ENV PORT=8081
EXPOSE 8081

USER node
CMD ["node", "app.js"]