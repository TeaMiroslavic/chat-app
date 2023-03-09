import Input from './Input';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Messages from './Messages';
import ActiveUsersList from './ActiveUsersList';

const nick = ['Mirko', 'Jozo', 'Pero', 'Tea', 'Klara', 'Nina', 'Dodo'];
const randomUser = (nick) => {
    return nick[Math.floor(Math.random() * nick.length)];
};
const randomUserColor = () => {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
};
const ChatRoom = ({ activeUsers, setActiveUsers }) => {
    const navigate = useNavigate();
    const [chat, setChat] = useState({
        users: {
            username: randomUser(nick),
            color: randomUserColor(),
        },
        messages: [],
    });
    const [drone, setDrone] = useState(null);
    useEffect(() => {
        if (!drone) {
            const drone = new window.Scaledrone('wIVYEKtdoqc1qemT', {
                data: chat.users,
            });
            setDrone(drone);
            drone.on('open', (error) => {
                if (error) {
                    return console.error(error);
                }
            });
            console.log('A new Scaledrone connection is created!');
        }

        return () => {
            if (drone) {
                drone.on('close', () => {
                    console.log('Connection has been closed');
                });
            }
        };
    }, [drone, chat.users]);

    useEffect(() => {
        if (drone) {
            const room = drone.subscribe('observable-room');
            console.log('SOBA:', room);
            room.on('open', (error) => {
                if (error) {
                    return console.error(error);
                }
                console.log('Successfully joined room');
            });

            room.on('members', (members) => {
                const newActiveUsers = members.map((member) => {
                    return {
                        id: member.id,
                        username: member.clientData.username,
                        color: member.clientData.color,
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
                setActiveUsers((activeUsers) => [
                    ...activeUsers,
                    newActiveUser,
                ]);
                console.log('Pushan sam', newActiveUser.username);
            });

            room.on('member_leave', (member) => {
                setActiveUsers((activeUsers) =>
                    activeUsers.filter((user) => user.id !== member.id)
                );
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
                            time: new Date().toISOString(),
                            clientId,
                            member,
                        },
                    ],
                }));
            });
        }
    }, [drone, setActiveUsers]);

    const sendMessage = (message) => {
        drone.publish({
            room: 'observable-room',
            message,
        });
    };

    const handleClick = () => {
        drone.close();
        console.log(`Odjavljeni ste ${chat.users.username}`);
        const userLoggedOut = {
            users: {
                username: '',
                color: '',
                id: '',
            },
            messages: [],
        };
        setChat(userLoggedOut);
        navigate('/');
        // navigirati na HomePage stranicu ili nešto
    };

    return (
        <div>
            <Messages currentUser={chat.users} messages={chat.messages} />
            <Input sendMessage={sendMessage} />
            <ActiveUsersList usersList={activeUsers} />
            <button type='button' onClick={handleClick}>
                Log out
            </button>
        </div>
    );
};

export default ChatRoom;
