import { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from './auth_context';
import { io } from 'socket.io-client';

export const useMessages = (room) => {
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef([]);
  const [socket, setSocket] = useState(null);
  const [authToken] = useContext(AuthContext);

  useEffect(() => {
    if (room) {

      const socket = io({
        auth: {
          token: authToken,
        },
        query: {
          roomKey: room.roomkey,
        },
      });

      setMessages([]);
      messagesRef.current = [];

      setSocket(socket);

      socket.on('message', (message) => {
        messagesRef.current.push(message);
        setMessages([...messagesRef.current]);
      });

      return () => {
        socket.off('message');
        socket.disconnect();
      };
    }
    return () => {};
  }, [room]);

  const sendMessage = (message, user, roomKey) => {

    if(message) {
        socket.emit('message', {
            message: message,
            userName: `${user.firstName} ${user.lastName}`,
            roomKey: roomKey,
            time: new Date(),
          });
    }    
  };

  return [messages, sendMessage];
}