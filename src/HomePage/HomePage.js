import styles from './HomePage.module.css';
import Layout from '../Layout/Layout';
import { useNavigate, Link } from 'react-router-dom';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const HomePage = ({ theme, toggleTheme }) => {
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
                theme={
                    theme === 'light' ? (
                        <LightModeIcon style={{ fill: 'black' }} />
                    ) : (
                        <DarkModeIcon style={{ fill: 'white' }} />
                    )
                }
                toggleTheme={toggleTheme}
                content={<h1>Home page</h1>}
                footer={
                    <h3>
                        Coded by&nbsp;<Link to='#'>Tea Miroslavić</Link>
                    </h3>
                }
            ></Layout>
        </div>
    );
};
export default HomePage;
