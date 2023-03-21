import styles from './ChatRoom.module.css';
import Input from '../Input/Input';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Messages from '../Messages/Messages';
import ActiveUsersList from '../ActiveUsersList/ActiveUsersList';
import OfflineUsersList from '../OfflineUsersList/OfflineUsersList';
import LogIn from '../LogIn/LogIn';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const channel = process.env.REACT_APP_CHANNEL_ID;

const ChatRoom = ({
    activeUsers,
    setActiveUsers,
    offlineUsers,
    setOfflineUsers,
}) => {
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
                    console.log('MEM', member);
                    const offlineUser = {
                        username: member.clientData.username,
                        color: member.clientData.color,
                        id: member.id,
                        isActive: false,
                    };
                    setOfflineUsers((offlineUsers) => [
                        ...offlineUsers,
                        offlineUser,
                    ]);
                    setActiveUsers((activeUsers) =>
                        activeUsers.filter((user) => user.id !== member.id)
                    );
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
    }, [chat, drone, setActiveUsers, offlineUsers, setOfflineUsers, navigate]);

    const sendMessage = (message) => {
        drone.publish({
            room: 'observable-room',
            message,
        });
    };

    const handleClick = () => {
        console.log('ušao sam');
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
        console.log('uspio sam');
        setChat(userLoggedOut);
    };

    return chat.users.username === '' && chat.users.color === '' ? (
        <div className={styles.layout}>
            <Header title={true} />
            <Main logIn={true} handleLogIn={handleLogIn}>
                <LogIn />
            </Main>
            <Footer />
        </div>
    ) : (
        <div className={styles.layoutChatroom}>
            <Header
                room={true}
                myRoom={room}
                logOutButton={true}
                handleClick={handleClick}
            />
            <Main
                messageContent={true}
                currentUser={chat.users}
                messages={chat.messages}
            >
                <Messages />
            </Main>
            <Footer input={true} sendMessage={sendMessage}>
                <Input />
            </Footer>
            <Sidebar
                activeList={true}
                offList={true}
                usersList={activeUsers}
                offlineList={offlineUsers}
            >
                <ActiveUsersList />
                <OfflineUsersList />
            </Sidebar>
        </div>
    );
};

export default ChatRoom;
