import styles from './LogIn.module.css';
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
            '#' +
            (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, '0');
        setUsers({ ...users, color: randomColor });
    };

    return (
        <section className={styles.loginContent}>
            <form className={styles.loginForm} onSubmit={handleSend}>
                <div className={styles.formHeader}>
                    <h2>Choose your nickname and random color</h2>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.inputWithButton}>
                        <label htmlFor='username' className={styles.nickname}>
                            Nickname:
                        </label>
                        <input
                            className={styles.nicknameInput}
                            id='username'
                            type='text'
                            autoFocus
                            name='username'
                            value={users.username}
                            onChange={handleChange}
                            placeholder='Nickname'
                        />
                        <button
                            className={styles.nicknameButton}
                            type='button'
                            onClick={getRandomNickname}
                        >
                            <CasinoRoundedIcon />
                        </button>
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.inputWithButton}>
                        <label htmlFor='color' className={styles.color}>
                            Color:
                        </label>
                        <input
                            className={styles.colorInput}
                            id='color'
                            type='color'
                            name='color'
                            value={users.color}
                            onChange={handleChange}
                        />
                        <button
                            className={styles.colorButton}
                            type='button'
                            onClick={getRandomColor}
                        >
                            <CasinoRoundedIcon />
                        </button>
                    </div>
                </div>
                <footer className={styles.formFooter}>
                    <button className={styles.submitButton} type='submit'>
                        Get in
                    </button>
                </footer>
            </form>
        </section>
    );
};

export default LogIn;
