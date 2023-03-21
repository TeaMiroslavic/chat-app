import './App.css';
import HomePage from './HomePage/HomePage';
import ChatRoom from './ChatRoom/ChatRoom';
/* import { HomePage, ChatRoom } from './components'; */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

const App = () => {
    const [activeUsers, setActiveUsers] = useState([]);
    const [offlineUsers, setOfflineUsers] = useState([]);

    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route
                        path='/chatroom'
                        element={
                            <ChatRoom
                                activeUsers={activeUsers}
                                setActiveUsers={setActiveUsers}
                                offlineUsers={offlineUsers}
                                setOfflineUsers={setOfflineUsers}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
