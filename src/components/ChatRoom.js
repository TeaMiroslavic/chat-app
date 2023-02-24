import Input from './Input';
// import Messages from './Messages';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

const nickName = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const randomUser = (nick) => {
    return nick[Math.floor(Math.random() * nick.length)];
};
const randomUserColor = () => {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
};
const uniqueId = uuidv4().slice(0, 8);
// console.log('id', uniqueId);

const ChatRoom = () => {
    console.log('ja sam');
    const [chat, setChat] = useState({
        member: {
            userName: randomUser(nickName),
            color: randomUserColor(),
            id: uniqueId,
        },
        messages: [],
        date: new Date().toLocaleDateString(),
        id: uniqueId,
    });

    const drone = new window.Scaledrone('VSCNlYJOMi2c4QHN', {
        data: chat.member,
    });
    const updateMemberId = () => {
        const newMembers = {
            ...chat.member,
            id: drone.clientId,
        };
        setChat({ member: newMembers });
    };
    drone.on('open', (error) => {
        if (error) {
            return console.error(error);
        }
        updateMemberId();
    });
    const room = drone.subscribe('observable-room');
    room.on('open', (error) => {
        if (error) {
            return console.error(error);
        }
    });
    room.on('message', (message) => {
        const { data, id, timestamp, clientId, member } = message;
        chat.messages.push({ data, id, timestamp, clientId, member });
        setChat({
            ...chat,
            messages: chat.messages.concat({ member, data, timestamp, id }),
        });
        console.log('mychat', chat);
    });
    const sendMessage = (message) => {
        drone.publish({
            room: 'observable-room',
            message,
        });
    };
    return (
        <div>
            <Input sendMessage={sendMessage} />
        </div>
    );
};
export default ChatRoom;
