import * as React from 'react';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

const Input = ({ sendMessage }) => {
    let [message, setMessage] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (message === '' || /^\s*$/.test(message)) return;
        sendMessage(message);
        console.log('MES', message);
        setMessage((message = ''));
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (message === '' || /^\s*$/.test(message)) return;
            sendMessage(message);
            setMessage((message = ''));
        }
    };

    return (
        <footer className='input'>
            <input
                type='text'
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder='Messsage'
                autoFocus
            />
            <button
                className='send-button'
                type='button'
                onClick={handleSend}
                disabled={!message || /^\s*$/.test(message)}
            >
                <SendIcon />
            </button>
        </footer>
    );
};
export default Input;
