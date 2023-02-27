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
        username: randomUser(nick),
        color: randomUserColor(),
        messages: [],
    });
    const [drone, setDrone] = useState(null);
    console.log('State prije drone:', chatMessages);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            const drone = new window.Scaledrone('VSCNlYJOMi2c4QHN', {
                data: chatMessages,
            });
            setDrone(drone);
            console.log('Connectionto Scaledrone successful!');
            return () => {
                mounted = false;
                drone.close();
            };
        }
    }, [chatMessages]);

    useEffect(() => {
        if (drone) {
            drone.on('open', (error) => {
                if (error) {
                    return console.error(error);
                }
                setChatMessages((prevState) => ({
                    ...prevState,
                    id: drone.clientId,
                }));
                console.log('users s id', chatMessages);
                console.log('connection successful');

                const time = new Date().toISOString();

                const room = drone.subscribe('observable-room');
                room.on('message', (message) => {
                    const { data, id, clientId } = message;
                    setChatMessages((prevState) => ({
                        ...prevState,
                        messages: [
                            ...prevState.messages,
                            {
                                textInput: data,
                                id,
                                time,
                                clientId,
                                member: chatMessages.username,
                            },
                        ],
                    }));
                });
            });
        }
        return () => {
            if (drone) {
                drone.close();
            }
        };
    }, [chatMessages, drone]);

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
