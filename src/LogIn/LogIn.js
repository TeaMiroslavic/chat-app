import { useState } from 'react';
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';

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
        <section className='login-content'>
            <form className='login-form' onSubmit={handleSend}>
                <div className='form-header'>
                    <h2>Choose your nickname and random color</h2>
                </div>
                <div className='input-container'>
                    <div className='input-with-button'>
                        <label htmlFor='username' className='nickname'>
                            Nickname:
                        </label>
                        <input
                            className='nickname-input'
                            id='username'
                            type='text'
                            autoFocus
                            name='username'
                            value={users.username}
                            onChange={handleChange}
                            placeholder='Nickname'
                        />
                        <button
                            className='nickname-button'
                            type='button'
                            onClick={getRandomNickname}
                        >
                            <CasinoRoundedIcon />
                        </button>
                    </div>
                </div>
                <div className='input-container'>
                    <div className='input-with-button'>
                        <label htmlFor='color' className='color'>
                            Color:
                        </label>
                        <input
                            className='color-input'
                            id='color'
                            type='color'
                            name='color'
                            value={users.color}
                            onChange={handleChange}
                        />
                        <button
                            className='color-button'
                            type='button'
                            onClick={getRandomColor}
                        >
                            <CasinoRoundedIcon />
                        </button>
                    </div>
                </div>
                <footer className='form-footer'>
                    <button className='submit-button' type='submit'>
                        Get in
                    </button>
                </footer>
            </form>
        </section>
    );
};

export default LogIn;
