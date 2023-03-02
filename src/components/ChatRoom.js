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
    const [chatUsers, setChatUsers] = useState({
        username: randomUser(nick),
        color: randomUserColor(),
    });
    const [messages, setMessages] = useState([]);
    const [drone, setDrone] = useState(null);
    console.log('State prije drone:', chatUsers);

    useEffect(() => {
        if (!drone) {
            const drone = new window.Scaledrone('VSCNlYJOMi2c4QHN', {
                data: chatUsers.users,
            });
            setDrone(drone);
            console.log('A new Scaledrone connection is created!');
        }
    }, [chatUsers, drone]);

    if (drone) {
        drone.on('open', (error) => {
            if (error) {
                return console.error(error);
            }
            const users = { ...chatUsers };
            users.id = drone.clientId;
            setChatUsers({ users });
            console.log('Connection to Scaledrone service is successful!');

            const time = new Date().toISOString();

            const room = drone.subscribe('observable-room');
            room.on('message', (message) => {
                const { data, id, clientId } = message;
                const chatMessages = [...messages];
                console.log('MES', chatMessages);
                console.log('Message Data: ', message.data);
                if (users.id === clientId) {
                    chatMessages.push({
                        message: data,
                        messageId: id,
                        time,
                        clientId,
                    });
                    console.log('ajd da vidimo', chatMessages);
                    setMessages((messages) => [
                        ...messages,
                        messages.push({
                            message: data,
                            messageId: id,
                            time,
                            clientId,
                        }),
                    ]);
                }
            });
        });
    }
    // setChatUsers(chatUsers.messages => [...chatUsers.messages, novaPoruka])
    const sendMessage = (message) => {
        drone.publish({
            room: 'observable-room',
            message,
        });
        console.log('users nakon inputa', chatUsers);
    };
    return (
        <div>
            {/*  <Messages activeUser={chat.users} messages={chat.messages} /> */}
            <Input sendMessage={sendMessage} />
        </div>
    );
};

export default ChatRoom;
