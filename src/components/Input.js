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

const Input = ({ sendMessage }) => {
    let [textInput, setTextInput] = useState('');
    const handleChange = (e) => {
        setTextInput(e.target.value);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (textInput === '' || /^\s*$/.test(textInput)) return;
        console.log('MES', textInput);
        sendMessage(textInput);
        setTextInput((textInput = ''));
        /* console.log('poruka', sendMessage(textInput)); */
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
                    value={textInput}
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
                                {/* <Button endIcon={<AttachFileRoundedIcon />}>
                </Button> */}
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
        </div>
    );
};
export default Input;
