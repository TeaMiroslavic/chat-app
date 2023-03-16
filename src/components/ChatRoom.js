import Input from './Input';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Messages from './Messages';
import ActiveUsersList from './ActiveUsersList';
import OfflineusersList from './OfflineUsersList';
import LogIn from './LogIn';
import Main from './Main';
import Footer from './Footer';
import Header from './Header';

const channel = process.env.REACT_APP_CHANNEL_ID;

const ChatRoom = ({ activeUsers, setActiveUsers }) => {
    const navigate = useNavigate();
    const [chat, setChat] = useState({
        users: {
            username: '',
            color: '',
            isActive: false,
        },
        messages: [],
    });
    const [drone, setDrone] = useState(null);
    const [room, setRoom] = useState('');
    const [offlineUsers, setOfflineUsers] = useState([]);

    const handleLogIn = (username, color) => {
        const newUser = {
            ...chat.users,
            username: username,
            color: color,
            isActive: true,
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
                            isActive: user.clientData.isActive,
                        };
                    });
                    setActiveUsers(newActiveUsers);
                });

                room.on('member_join', (member) => {
                    const newActiveUser = {
                        id: member.id,
                        username: member.clientData.username,
                        color: member.clientData.color,
                        isActive: member.clientData.isActive,
                    };
                    setActiveUsers((activeUsers) => [
                        ...activeUsers,
                        newActiveUser,
                    ]);
                });

                room.on('member_leave', (member) => {
                    setActiveUsers((activeUsers) => {
                        const offlineUser = activeUsers.find(
                            (user) => user.id === member.id
                        );
                        if (offlineUser) {
                            offlineUser.isActive = false;
                            setOfflineUsers((offlineUsers) => [
                                ...offlineUsers,
                                offlineUser,
                            ]);
                        }
                        return activeUsers.filter(
                            (user) => user.id !== member.id
                        );
                    });
                });

                room.on('history_message', (message) => {
                    console.log('HISTORY:', message);
                });
                room.on('message', (message) => {
                    const time = new Date().toLocaleString();
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
                isActive: false,
            },
            messages: [],
        };
        setChat(userLoggedOut);
    };

    return chat.users.username === '' && chat.users.color === '' ? (
        <div className='layout'>
            <Header title={true} />
            <Main logIn={true} handleLogIn={handleLogIn}>
                <LogIn />
            </Main>
            <Footer />
        </div>
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
            <ActiveUsersList usersList={activeUsers} currentUser={chat.users} />
            <OfflineusersList offlineList={offlineUsers} />
        </div>
    );
};

export default ChatRoom;
