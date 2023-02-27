import Input from './Input';
import { useState, useEffect } from 'react';

const nick = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const randomUser = (nick) => {
    return nick[Math.floor(Math.random() * nick.length)];
};
const randomUserColor = () => {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
};
const ChatRoom = () => {
    const [chatMessages, setChatMessages] = useState({
        users: {
            username: randomUser(nick),
            color: randomUserColor(),
        },
        messages: [],
    });
    const [drone, setDrone] = useState(null);
    console.log('State prije drone:', chatMessages);

    useEffect(() => {
        if (!drone) {
            const drone = new window.Scaledrone('VSCNlYJOMi2c4QHN', {
                data: chatMessages,
            });
            setDrone(drone);
            console.log('A new Scaledrone connection is created!');
        }
    }, [chatMessages, drone]);

    if (drone) {
        drone.on('open', (error) => {
            if (error) {
                return console.error(error);
            }
            chatMessages.users.id = drone.clientId;
            setChatMessages(
                {
                    ...chatMessages,
                },
                chatMessages.users.id
            );
            console.log('users id', chatMessages.users);
            console.log('Connection to Scaledrone service is successful!');

            const time = new Date().toISOString();

            const room = drone.subscribe('observable-room');
            room.on('message', (message) => {
                const { data, id, clientId, member } = message;
                chatMessages.messages.push({
                    textInput: data,
                    id,
                    time,
                    clientId,
                    member,
                });
                setChatMessages({ ...chatMessages }, chatMessages.messages);
            });
        });
    }
    const sendMessage = (textInput) => {
        drone.publish({
            room: 'observable-room',
            message: textInput,
        });
        console.log('users nakon inputa', chatMessages);
    };
    return (
        <div>
            {/*  <Messages activeUser={chat.users} messages={chat.messages} /> */}
            <Input sendMessage={sendMessage} />
        </div>
    );
};

export default ChatRoom;
