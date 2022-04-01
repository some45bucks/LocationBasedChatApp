import { useState, useEffect, useRef, useContext } from 'react';

import { Button } from '../common/button';
import { AuthContext } from '../../utils/auth_context';
import { ApiContext } from '../../utils/api_context';


export const Room = ({room}) => {

    if(room)
    {
        return (
            <div>
               {room.roomkey}
            </div>
        );
    }
    else{
        return (
            <div>
               click Room
            </div>
        );
    }

    
}