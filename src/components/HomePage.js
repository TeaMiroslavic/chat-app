import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/chatroom');
    };
    return (
        <div className='layout'>
            <Header title={true} logInButton={true} onClick={handleClick} />
            <Main></Main>
            <Footer title={true}></Footer>
        </div>
    );
};
export default HomePage;
