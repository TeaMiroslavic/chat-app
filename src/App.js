import './App.css';
import HomePage from './HomePage/HomePage';
import ChatRoom from './ChatRoom/ChatRoom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

const App = () => {
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        } else {
            const isDarkMode =
                window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches;
            return isDarkMode ? 'dark' : 'light';
        }
    };

    const [theme, setTheme] = useState(getInitialTheme());

    useEffect(() => {
        const themeClass = theme === 'light' ? 'light-theme' : 'dark-theme';
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(themeClass);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };
    return (
        <HashRouter>
            <div className={`App ${theme}`}>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <HomePage theme={theme} toggleTheme={toggleTheme} />
                        }
                    />
                    <Route
                        path='/chatroom'
                        element={
                            <ChatRoom theme={theme} toggleTheme={toggleTheme} />
                        }
                    />
                </Routes>
            </div>
        </HashRouter>
    );
};
export default App;
