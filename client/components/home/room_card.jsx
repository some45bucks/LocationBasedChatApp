import { useEffect } from 'react/cjs/react.production.min';
import { Socket } from 'socket.io-client';
import { Button } from '../common/button';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



export const Room_Card = ({room,joinRoom}) => {

    return (
        <>
        <div className="room-card">
            <div className="room-card-container">
                <span className="text-xl">{room.name}</span>
            </div>

            
            
            <div className="room-card-container">
                    <Button onClick={joinRoom}>Join</Button>
            </div>
            
        </div>
        <div className="latLong">
              {room.latitude}  {room.longitude}
        </div>
        </>
        
          
    );
}