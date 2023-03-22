import styles from './HomePage.module.css';
import Layout from '../Layout/Layout';
/* import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer'; */
import { useNavigate, Link } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/chatroom');
    };
    return (
        <div className={styles.layout}>
            <Layout
                title={<h1>Spill the Tea</h1>}
                button={
                    <button
                        className={styles.buttonLogin}
                        onClick={handleLogin}
                    >
                        Log in
                    </button>
                }
                content={<h1>Home page</h1>}
                footer={
                    <h3>
                        Coded by&nbsp;<Link to='#'>Tea Miroslavić</Link>
                    </h3>
                }
            ></Layout>
            {/* <Header title={true} logInButton={true} onClick={handleClick} />
            <Main></Main>
            <Footer title={true}></Footer> */}
        </div>
    );
};
export default HomePage;
