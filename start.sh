#!/bin/bash

echo "🚀 Starting Smart Investment Planner..."
echo ""

# Start backend server
echo "📡 Starting backend server on port 5000..."
cd server && node server.js &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend server
echo "💻 Starting frontend dev server on port 3000..."
cd ../client && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Application started successfully!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔌 Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Handle cleanup on exit
trap "echo '\n🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM

# Wait for both processes
wait
