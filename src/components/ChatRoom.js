import Input from './Input';
import { useState, useEffect } from 'react';

const channel = process.env.REACT_APP_CHANNEL_ID;
console.log('kanal', channel);

const nick = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const randomUser = (nick) => {
    return nick[Math.floor(Math.random() * nick.length)];
};
const randomUserColor = () => {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
};
const ChatRoom = () => {
    const chatRoom = {
        users: {
            username: randomUser(nick),
            color: randomUserColor(),
        },
        messages: [],
    };
    const [chat, setChat] = useState(chatRoom);
    const [drone, setDrone] = useState(null);
    useEffect(() => {
        if (!drone) {
            const drone = new window.Scaledrone(channel, {
                data: chat.users,
            });
            setDrone(drone);
            console.log('A new Scaledrone connection is created!');
        }
    }, [chat, drone]);

    if (drone) {
        drone.on('open', (error) => {
            if (error) {
                return console.error(error);
            }
            setChat({
                ...chat,
                users: {
                    ...chat.users,
                    id: drone.clientId,
                },
            });
            const time = new Date().toISOString();

            const room = drone.subscribe('observable-room');

            room.on('message', (message) => {
                const { data, id, clientId } = message;
                setChat((chat) => ({
                    ...chat,
                    messages: [
                        ...chat.messages,
                        {
                            message: data,
                            messageId: id,
                            time,
                            clientId,
                        },
                    ],
                }));
            });
        });
    }
    const sendMessage = (message) => {
        drone.publish({
            room: 'observable-room',
            message,
        });
    };
    console.log('U', chat.users);
    console.log('M', chat.messages);
    return (
        <div>
            {/* <Messages activeUser={chat.users} messages={chat.messages} /> */}
            <Input sendMessage={sendMessage} />
        </div>
    );
};

export default ChatRoom;
