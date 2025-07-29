#!/bin/sh


cd backend
npm install
npm run dev &
BACK_PID=$!
cd ..


cd frontend
npm install
npm run dev -- --host 0.0.0.0 --port 5173 &
FRONT_PID=$!
cd ..


wait $BACK_PID $FRONT_PID
