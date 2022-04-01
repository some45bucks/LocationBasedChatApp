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

    useEffect(() => {
        console.log("messages");
        console.log(messages);
    },[messages])

    if(!room){
        return <div>No room selected</div>;
    }

    return (
        <div>
            {room.name}
            <div>
                <Button onClick={()=>{
                    console.log("send");
                    sendMessage(nextMessage,user,room.roomkey)}}>Send Message</Button>
                <Input value={nextMessage} onChange={(e)=>{
                    setNextMessage(e.target.value)}}/>
            </div>
            <div>
                {messages.map((message) => {
                    console.log("message");
                    return <div key={message.time}><Message message={message}/></div> 
                })}
            </div>
        </div>
        
    );

}