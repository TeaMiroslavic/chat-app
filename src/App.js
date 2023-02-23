import './App.css';
import HomePage from './HomePage';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Recovery from './Recovery';
import ChatRoom from './ChatRoom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={<LogIn />} />
                    <Route path='/login/recovery' element={<Recovery />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/chatroom' element={<ChatRoom />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
