//import { useState } from 'react';

const nickName = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const randomUser = (nick) => {
    return nick[Math.floor(Math.random() * nick.length)];
};
const randomUserColor = () => {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
};
// console.log(randomUser(nickName));
// console.log(randomUserColor());
const Messages = () => {
    const user = { userName: randomUser(nickName), color: randomUserColor() };

    return (
        <div style={{ backgroundColor: user.color }}>
            <span>{user.userName}</span>
        </div>
    );
};

export default Messages;
