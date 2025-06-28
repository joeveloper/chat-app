import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import app from './app';
import { handleChatSocket } from './sockets/chat.socket';

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  handleChatSocket(socket, io);

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// Start Server
server.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
