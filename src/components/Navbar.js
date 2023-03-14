import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useNavigate } from 'react-router-dom';
/* import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'; */

const Navbar = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/chatroom');
    };
    let [theme, setTheme] = useState('light');
    console.log(theme);

    const handleClickTheme = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
        return theme;
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    {/* <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}
                    >
                        News
                    </Typography>
                    <Button
                        color='inherit'
                        startIcon={
                            theme === 'light' ? (
                                <WbSunnyIcon />
                            ) : (
                                <DarkModeIcon />
                            )
                        }
                        onClick={handleClickTheme}
                    >
                        Theme
                    </Button>
                    <Button color='inherit' onClick={handleClick}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default Navbar;
