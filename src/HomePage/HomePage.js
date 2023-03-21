import styles from './HomePage.module.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/chatroom');
    };
    return (
        <div className={styles.layout}>
            <Header title={true} logInButton={true} onClick={handleClick} />
            <Main></Main>
            <Footer title={true}></Footer>
        </div>
    );
};
export default HomePage;
