import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { Button } from '../common/button';
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
  const [currentPosition, setCurrentPosition] = useState(null);

  function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") { dist = dist * 1.609344; }
    if (unit == "N") { dist = dist * 0.8684; }
    return dist;
  }

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    

    navigator.geolocation.getCurrentPosition(async (position) => {
      setCurrentPosition(position);

      let {rooms} = await api.get('/rooms');

      let filter =[];

      rooms.forEach(room => {

        const dis = distance(
          position.coords.latitude,
          position.coords.longitude,
          room.latitude,
          room.longitude,
          'K'
        );

        if(dis < 10){
          filter = [...filter, room];
        }

        
      });

      rooms = filter;
      setLoading(false);
      setCurrentRooms(rooms);
    });

    

    
  }, [currentRoom]); 
  
  if (loading) {
    return <div>Loading...</div>;
  }

  const createRoom = async () => {
      if(roomName)
      {
        const RoomBody = {
          name: roomName,
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude,
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
  };

  

  return (
    <div className="main-parent">
      <div className="main-side-column">
        <div className="room-card-create">
          <div className="room-card-container-create">
          <Input value={roomName} onChange={(e)=>{setRoomName(e.target.value)}}/>
          </div>
          <div className="room-card-container-create">
            <Button onClick={()=>createRoom()}>Create Room at: {currentPosition.coords.latitude}  {currentPosition.coords.longitude}</Button>
          </div>
          
        </div>
        
        <div className="main-side-column-rooms">
          {currentRooms.map((room) => {
            return <div key={room.roomkey}><Room_Card room={room} joinRoom={()=>{setCurrentRoom(room)}}/></div> 
          })}
        </div>
      </div>
      

      <div  className="main-room-container">
        <Room room={currentRoom} user={user}/>
      </div>
    </div>
  );
};
