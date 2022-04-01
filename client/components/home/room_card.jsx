import { useEffect } from 'react/cjs/react.production.min';
import { Socket } from 'socket.io-client';
import { Button } from '../common/button';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



export const Room_Card = ({room,joinRoom}) => {

    return (
        <div>
            {room.name}
            <Button onClick={joinRoom}>Join</Button>
            {room.roomkey}
        </div>
          
    );
}