import { useState } from 'react';

const LogIn = ({ handleLogIn }) => {
    const [users, setUsers] = useState({
        username: '',
        color: '#000000',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        name === 'username'
            ? setUsers({ ...users, username: value })
            : setUsers({ ...users, color: value });
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (
            (users.username === '' && users.color === '') ||
            /^\s*$/.test(users.username)
        )
            return;
        handleLogIn(users.username, users.color);
        setUsers({ username: '', color: '' });
    };

    const getRandomNickname = () => {
        const nicks = ['Tea', 'Dodo', 'Klarica', 'Jojo', 'Jura', 'Lola'];
        const randomNickname = nicks[Math.floor(Math.random() * nicks.length)];
        setUsers({ ...users, username: randomNickname });
    };

    const getRandomColor = () => {
        const randomColor =
            '#' + Math.floor(Math.random() * 0xffffff).toString(16);
        setUsers({ ...users, color: randomColor });
    };

    return (
        <div>
            <form onSubmit={handleSend}>
                <label htmlFor='username'>
                    Nickname:
                    <input
                        id='username'
                        type='text'
                        autoFocus
                        name='username'
                        value={users.username}
                        onChange={handleChange}
                        placeholder='Nickname'
                    />
                    <button type='button' onClick={getRandomNickname}>
                        Random
                    </button>
                </label>
                <label htmlFor='color'>
                    Color:
                    <input
                        is='color'
                        type='color'
                        name='color'
                        value={users.color}
                        onChange={handleChange}
                    />
                    <button type='button' onClick={getRandomColor}>
                        Random
                    </button>
                </label>
                <button onSubmit={handleSend}>Get in</button>
            </form>
        </div>
    );
};

export default LogIn;
