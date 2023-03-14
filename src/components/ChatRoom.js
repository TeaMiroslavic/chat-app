import Input from './Input';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Messages from './Messages';
import ActiveUsersList from './ActiveUsersList';
import LogIn from './LogIn';

const channel = process.env.REACT_APP_CHANNEL_ID;

const ChatRoom = ({ activeUsers, setActiveUsers }) => {
    const navigate = useNavigate();
    const [chat, setChat] = useState({
        users: {
            username: '',
            color: '',
        },
        messages: [],
    });
    const [drone, setDrone] = useState(null);
    const [room, setRoom] = useState('');

    const handleLogIn = (username, color) => {
        const newUser = {
            ...chat.users,
            username: username,
            color: color,
        };
        const newChat = {
            ...chat,
            users: newUser,
        };

        setChat(newChat);

        const newDrone = new window.Scaledrone(channel, {
            data: newUser,
        });
        setDrone(newDrone);
        console.log('new user', newUser);
        console.log('A new Scaledrone connection is created!');
    };

    useEffect(() => {
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

                const room = drone.subscribe('observable-room');

                room.on('open', (error) => {
                    if (error) {
                        return console.error(error);
                    }
                    console.log('Successfully joined room');
                });
                setRoom(room.name);

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
                    setActiveUsers((activeUsers) => [
                        ...activeUsers,
                        newActiveUser,
                    ]);
                });

                room.on('member_leave', (member) => {
                    setActiveUsers((activeUsers) =>
                        activeUsers.filter((user) => user.id !== member.id)
                    );
                });

                room.on('history_message', (message) => {
                    console.log('HISTORY:', message);
                });
                room.on('message', (message) => {
                    const time = new Date().toLocaleString();
                    const { data, id, clientId, member } = message;
                    console.log('PRVI MEM', member);
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
        return () => {
            if (drone) {
                drone.on('close', () => {
                    window.location.reload();
                    navigate('/');
                    console.log('Connection has been closed');
                });
            }
        };
    }, [chat, drone, setActiveUsers, navigate]);

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
    };

    return chat.users.username === '' && chat.users.color === '' ? (
        <LogIn handleLogIn={handleLogIn} />
    ) : (
        <div className='chatroom-container'>
            <header className='header'>
                <span className='my-room'>#{room}</span>
                <button
                    className='button-logout'
                    type='button'
                    onClick={handleClick}
                >
                    Log out
                </button>
            </header>
            <Messages currentUser={chat.users} messages={chat.messages} />
            <Input sendMessage={sendMessage} />
            <ActiveUsersList usersList={activeUsers} />
        </div>
    );
};

export default ChatRoom;
