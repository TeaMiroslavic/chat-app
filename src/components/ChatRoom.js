import Input from './Input';
import { useState, useEffect } from 'react';
import Messages from './Messages';
import ActiveUsersList from './ActiveUsersList';

const channel = process.env.REACT_APP_CHANNEL_ID;

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
    const [activeUsers, setActiveUsers] = useState([]);
    useEffect(() => {
        if (!drone) {
            const drone = new window.Scaledrone(channel, {
                data: chat.users,
            });
            setDrone(drone);
            console.log('A new Scaledrone connection is created!');
        }
    }, [drone, chat.users]);

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
            room.on('open', (error) => {
                if (error) {
                    return console.error(error);
                }
                console.log('Successfully joined room');
            });

            room.on('members', (activeUser) => {
                const newActiveUsers = activeUser.map((user) => {
                    return {
                        id: user.id,
                        username: user.clientData.username,
                        color: user.clientData.color,
                    };
                });
                setActiveUsers(newActiveUsers);
            });

            room.on('member_join', (member) => {
                const newActiveUser = {
                    id: member.id,
                    username: member.clientData.username,
                    color: member.clientData.color,
                };
                setActiveUsers([...activeUsers, newActiveUser]);
            });

            room.on('message', (message) => {
                const { data, id, clientId, member } = message;
                setChat((chat) => ({
                    ...chat,
                    messages: [
                        ...chat.messages,
                        {
                            message: data,
                            messageId: id,
                            time,
                            clientId,
                            member,
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
    return (
        <div>
            <Messages activeUser={chat.users} messages={chat.messages} />
            <Input sendMessage={sendMessage} />
            <ActiveUsersList usersList={activeUsers} />
        </div>
    );
};

export default ChatRoom;
