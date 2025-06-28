import { Server, Socket } from 'socket.io';

interface MessageData {
  roomId: string;
  message: string;
  sender: string;
}

// Handle chat socket events
export const handleChatSocket = (socket: Socket, io: Server) => {

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
  });

  socket.on('sendMessage', (req) => {
    const {roomId, message} = req
    io.to(roomId).emit('message', { message });
    console.log(req)
  });

  socket.on('disconnect', () => {
    console.log(`❌ Socket disconnected: ${socket.id}`);
  });
};
