import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import InsertEmoticonRoundedIcon from '@mui/icons-material/InsertEmoticonRounded';
import Stack from '@mui/material/Stack';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import debounce from 'lodash/debounce';

const Input = ({ sendMessage }) => {
    let [message, setMessage] = useState('');
    const [typing, setTyping] = useState(false);

    const handleIsTyping = debounce(function () {
        setTyping(false);
    }, 5000);

    const handleChange = (e) => {
        setMessage(e.target.value);
        setTyping(true);
        handleIsTyping();
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (message === '' || /^\s*$/.test(message)) return;
        sendMessage(message);
        setMessage((message = ''));
    };
    return (
        <div className='input'>
            <Box
                sx={{
                    width: 'auto',
                    maxWidth: '100%',
                }}
                component='form'
                onSubmit={handleSend}
            >
                <TextField
                    fullWidth
                    placeholder='Message'
                    id='fullWidth'
                    onChange={handleChange}
                    onSubmit={handleSend}
                    value={message}
                    autoFocus
                    InputProps={{
                        endAdornment: (
                            <ButtonGroup>
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    spacing={2}
                                >
                                    <Button
                                        endIcon={<AttachFileRoundedIcon />}
                                        component='label'
                                    >
                                        <input
                                            hidden
                                            accept='pdf/*'
                                            multiple
                                            type='file'
                                        />
                                    </Button>
                                </Stack>
                                <Button
                                    endIcon={<AttachFileRoundedIcon />}
                                ></Button>
                                <Button endIcon={<CameraAltRoundedIcon />} />
                                <Button
                                    variant='contained'
                                    endIcon={<SendIcon />}
                                    type='submit'
                                >
                                    Send
                                </Button>
                            </ButtonGroup>
                        ),
                        startAdornment: (
                            <Button
                                startIcon={<InsertEmoticonRoundedIcon />}
                            ></Button>
                        ),
                    }}
                />
            </Box>
            {typing && `User is typing...`}
        </div>
    );
};
export default Input;
