import './App.css';
import HomePage from './HomePage/HomePage';
import ChatRoom from './ChatRoom/ChatRoom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LogIn from './LogIn/LogIn';

const App = () => {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/chatroom' element={<ChatRoom />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
