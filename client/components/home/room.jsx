import { useState, useEffect, useRef, useContext } from 'react';

import { Button } from '../common/button';
import { AuthContext } from '../../utils/auth_context';
import { ApiContext } from '../../utils/api_context';
import { Input } from '../common/input';
import { Message } from './message';
import { useMessages } from '../../utils/use_mesages';



export const Room = ({room,user}) => {
    const [nextMessage, setNextMessage] = useState('');
    const [messages, sendMessage] = useMessages(room);

    useEffect(() => {
        setNextMessage('');
    }, [room])

    if(!room){
        return <span className="text-xl room-title">Click On a Room</span> ;
    }

    return (
        <div>
            <span className="text-xl room-title">{room.name}</span> 
            <div className="message-container">
                {[...messages].reverse().map((message) => {
                    return <div key={message.time}><Message message={message}/></div> 
                })}
            </div>
            <div className="send-container">
                <Button onClick={()=>{
                    sendMessage(nextMessage,user,room.roomkey)}}>Send Message</Button>
                <Input className="myinput send-input" value={nextMessage} onChange={(e)=>{
                    setNextMessage(e.target.value)}}/>
            </div>
            
        </div>
        
    );

}