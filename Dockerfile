FROM node:22-alpine

WORKDIR /app


COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

RUN cd backend && npm install && cd ../frontend && npm install && cd ..


COPY backend ./backend
COPY frontend ./frontend


COPY start.sh ./start.sh
RUN chmod +x ./start.sh


EXPOSE 3000 5173


ENV NODE_ENV=development

CMD ["./start.sh"]
