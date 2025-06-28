'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSocket } from '@/hooks/useSocket';
import { CHAT_API } from '@/services/chatService';

const Chat: React.FC = () => {
  const router = useRouter();
  const socket = useSocket();
  const params = useParams();
  const roomId = params?.id as string;
  const [messages, setMessages] = useState<{ username: string; content: string }[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const sender = typeof window !== 'undefined' ? localStorage.getItem('username') || 'User' : 'User';

  useEffect(() => {
    const getMessages = async () => {
      if (!roomId) return;
      const data = await CHAT_API.fetchMessages(roomId);
      console.log('data',data)
      setMessages(data);
    };
    getMessages();
  }, [roomId]);

  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', roomId);
      socket.on('message', async () => {
        if (roomId) {
          const data = await CHAT_API.fetchMessages(roomId);
          setMessages(data);
        }
      });
    }
    return () => {
      socket?.off('message');
    };
  }, [socket, roomId]);

  const sendMessage = async () => {
    // if (!roomId || !message.trim()) return;
    // setLoading(true);
      console.log('msg', message, roomId)
    
    try {
      console.log(message, roomId)
      socket?.emit('sendMessage', { roomId, message });
      await CHAT_API.sendMessageToApi(roomId, message);
      const data = await CHAT_API.fetchMessages(roomId);
      setMessages(data);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-white text-xl font-semibold">&larr;</button>
        <h1 className="text-lg font-semibold mx-auto">Chat Room</h1>
        <div className="w-6" /> {/* spacer to balance the back button */}
      </header>

      <main className="flex flex-col-reverse md:flex-row flex-1 p-4 gap-4">
        {/* Left - Message Input */}
        <div className="w-full md:w-1/3">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
            <button
              onClick={sendMessage}
              // disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </div>

        {/* Right - Messages */}
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow p-4 overflow-y-auto max-h-[75vh]">
          <div className="space-y-4">
            {messages?.length === 0 ? (
              <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
            ) : (
              messages?.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md max-w-[80%] ${
                    msg.username === sender
                      ? 'bg-blue-100 text-right ml-auto'
                      : 'bg-gray-200 text-left'
                  }`}
                >
                  <div className="text-xs font-semibold text-gray-700 mb-1">
                    {msg.username}
                  </div>
                  <p className="text-sm text-gray-800">{msg.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;



// import React, { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import './Chat.css';
// import { useSocket } from '@/hooks/useSocket';
// import { CHAT_API } from '@/services/chatService';
// // import { fetchMessages, sendMessageToApi } from '@/services/chatService';

// const Chat: React.FC = () => {
//   const { roomId } = useParams<{ roomId: string }>();
//   const router = useRouter();
//   const socket = useSocket();
//   const [messages, setMessages] = useState<{ username: string; content: string }[]>([]);
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false); // Loader state
//   const sender = localStorage.getItem('username') || 'User';

//   // Fetch previous messages from API
//   useEffect(() => {
//     const getMessages = async () => {
//       if (!roomId) return;
//       const data = await CHAT_API.fetchMessages(roomId);
//       setMessages(data);
//     };
  
//     getMessages();
//   }, [roomId]);

//   // WebSocket listener for new messages
//   useEffect(() => {
//     if (socket) {
//       socket.emit('joinRoom', roomId);

//       socket.on('message', async (newMessage) => {
//         if (roomId) {
//           const data = await CHAT_API.fetchMessages(roomId);
//           setMessages(data);
//         }
//       });
//     }

//     return () => {
//       socket?.off('message');
//     };
//   }, [socket, roomId]);

//   const sendMessage = async () => {
//     if (!roomId || !message.trim()) return;
//     setLoading(true); // Start loader

//     try {
//       const newMessage = { roomId, message };
//       socket?.emit('sendMessage', newMessage);
//       await CHAT_API.sendMessageToApi(roomId, message);

//       const data = await CHAT_API.fetchMessages(roomId);
//       setMessages(data);
//       setMessage('');
//     } catch (error) {
//       console.error("Error sending message:", error);
//     } finally {
//       setLoading(false); // Stop loader
//     }
//   };

//   return (
//     <div>
//       <header className="chat-header">
//         <button className="back-button" onClick={() => router.back()}>←</button>
//         <h1 style={{ color: "white", textAlign: "center" }}>Chat Room</h1>
//       </header>
//       <div className="chat-container">
//         {/* Left Side - Input Section */}
//         <div className="chat-left">
//           <div className="message-input">
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Type a message..."
//               disabled={loading} // Disable input while loading
//             />
//             <button onClick={sendMessage} disabled={loading}>
//               {loading ? "Sending..." : "Send"}
//             </button>
//           </div>
//         </div>

//         {/* Right Side - Messages Section */}
//         <div className="chat-right">
//           <div className="messages">
//             {messages.length === 0 ? (
//               <p className="no-messages">No messages yet. Start the conversation!</p>
//             ) : (
//               messages.map((msg, index) => (
//                 <div key={index} className={`message ${msg.username === sender ? 'sent' : 'received'}`}>
//                   <span className="sender">{msg.username}</span>
//                   <p>{msg.content}</p>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }; 

// export default Chat;
