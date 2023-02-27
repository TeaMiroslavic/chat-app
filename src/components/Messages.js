import Input from './Input';
import { useState, useEffect } from 'react';

const nickName = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const randomUser = (nick) => {
    return nick[Math.floor(Math.random() * nick.length)];
};
const randomUserColor = () => {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
};
const ChatRoom = () => {
    const [chat, setChat] = useState({
        users: {
            userName: randomUser(nickName),
            color: randomUserColor(),
        },
        messages: [],
    });
    const [drone, setDrone] = useState(null);

    useEffect(() => {
        /* if (!drone) { */
        const drone = new window.Scaledrone('VSCNlYJOMi2c4QHN', {
            data: chat.users,
        });
        setDrone(drone);
        console.log('New connection has been opened');
        /* } */
    }, [chat.users]);

    useEffect(() => {
        if (drone) {
            drone.on('open', (error) => {
                if (error) {
                    return console.error(error);
                }
                console.log('You are connected to the room');
                const users = { ...chat.users };
                users.id = drone.clientId;
                setChat({ ...chat, users });
                console.log('USER:', users);

                const room = drone.subscribe('observable-room');
                room.on('data', (data, member) => {
                    console.log('da, to je taj room');
                    const messages = [...chat.messages];
                    console.log('kopija', messages);
                    messages.push({ member, textMessage: data });
                    setChat({ ...chat, messages });
                    console.log('message', messages);
                });
            });
        }
    }, [chat.users, drone]);

    const sendMessage = (message) => {
        drone.publish({
            room: 'observable-room',
            message,
        });
    };

    return (
        <div>
            {/*  <Messages activeUser={chat.users} messages={chat.messages} /> */}
            <Input sendMessage={sendMessage} />
        </div>
    );
};

export default ChatRoom;
