import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { Button } from '../common/button';
import { io } from 'socket.io-client';
import { Room } from './room';
import {Ping} from './ping';

export const Home = () => {
  const api = useContext(ApiContext);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [currentRoomKey, setCurrentRoomKey] = useState(null);
  const [currentRooms, setCurrentRooms] = useState([]);
  const [authToken] = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);


  useEffect(async () => {
    const {rooms} = await api.get('/rooms');
    setCurrentRooms(rooms);
  }, []);
  
  useEffect(() => {
      const socket = io({
        auth: { token: authToken },
        query: { message: 'I am the query ' },
      });

      socket.on('connect', () => {
        setSocket(socket);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected');
      });

      return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.disconnect();
      };
  }, []);

  useEffect(() => {
      if (socket) {
          socket.auth.token = authToken;
      }
  }, [authToken]);

  useEffect(async () => {
    if(currentRoomKey){
      const {room} = await api.get(`/rooms/key/${currentRoomKey}`)
      setCurrentRoom(room);
    }
}, [currentRoomKey]);
  
  if (loading || !socket) {
    return <div>Loading...</div>;
  }

  const createRoom = async () => {
      const RoomBody = {
          name: "test",
      }

      const {room} = await api.post('/rooms', RoomBody);

      await joinRoom(room.roomkey);
  }

  const joinRoom = async (roomKey) => {
    socket.emit('join-room', { currentRoomKey, newRoomKey: roomKey }, (response) => {
        console.log(response);
        setCurrentRoomKey(response.newRoomKey);
    });
  }

  return (
    <div>
      <Button onClick={createRoom}>New Room</Button>
      <Room room={currentRoom}/>
      {currentRooms.map((room) => {
        console.log(room.roomkey);
        return <div key={room.id}><Button onClick={()=>{joinRoom(room.roomkey)}}>{room.id}</Button></div> 
      })}
    </div>
  );
};
