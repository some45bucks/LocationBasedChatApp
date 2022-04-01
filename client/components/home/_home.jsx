import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { Button } from '../common/button';
import { io } from 'socket.io-client';
import { Room } from './room';
import { Room_Card } from './room_card';
import { Input } from '../common/input';

export const Home = () => {
  const api = useContext(ApiContext);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [currentRoomKey, setCurrentRoomKey] = useState(null);
  const [currentRooms, setCurrentRooms] = useState([]);
  const [authToken] = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [roomName, setRoomName] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    const {rooms} = await api.get('/rooms');
    setCurrentRooms(rooms);
    setLoading(false);
  }, [currentRoom]); 
  
  if (loading) {
    return <div>Loading...</div>;
  }

  const createRoom = async () => {
      if(roomName)
      {
        const RoomBody = {
          name: roomName,
        }

        setRoomName('');

        const {room} = await api.post('/rooms', RoomBody);
        console.log(room);
        
        setCurrentRooms([...currentRooms, room]);
        setCurrentRoom(room);

      }
      else{
        alert('Please enter a room name');
      }
  }

  return (
    <div>
      <Button onClick={()=>createRoom()}>New Room</Button>
      <Input id="roomNameEnter" value={roomName} onChange={(e)=>{setRoomName(e.target.value)}}/>

      <div>
        <Room room={currentRoom} user={user}/>
      </div>
      <div>
        {currentRooms.map((room) => {
          return <div key={room.roomkey}><Room_Card room={room} joinRoom={()=>{setCurrentRoom(room)}}/></div> 
        })}
      </div>
      
    </div>
  );
};
