import './App.css';
import { HomePage, LogIn, SignUp, Recovery, ChatRoom } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

const App = () => {
    const [activeUsers, setActiveUsers] = useState([]);

    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={<LogIn />} />
                    <Route path='/login/recovery' element={<Recovery />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route
                        path='/chatroom'
                        element={
                            <ChatRoom
                                activeUsers={activeUsers}
                                setActiveUsers={setActiveUsers}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
