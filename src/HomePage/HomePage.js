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
                content={
                    <div className={styles.container}>
                        <div className={styles.title}>
                            <h1>Welcome to the Spill the Tea!</h1>
                        </div>
                        <section className={styles.section}>
                            <div className={styles.cardOne}>
                                <p>
                                    Something troubling you and you want to get
                                    it out of you?
                                </p>
                            </div>
                            <div className={styles.cardTwo}>
                                <p>
                                    You heard juicy gossip about someone or
                                    something but all of your friends pretend to
                                    be nice and don't want to gossip with you?
                                </p>
                            </div>
                            <div className={styles.cardThree}>
                                <p>
                                    Or you just have an opinion about something
                                    and want to discuss it with someone?
                                </p>
                            </div>
                            <div className={styles.cardFour}>
                                <p>
                                    Don't worry, my chat app{' '}
                                    <b>Spill the Tea</b> allows you to do all
                                    that. Simply click on Log in button in the
                                    right corner of the page, choose your
                                    nickname and a color in which you want your
                                    messages to be displayed. Don't worry, I
                                    don't collect any personal information so
                                    you can chat completely{' '}
                                    <strong>anonymously</strong>.
                                </p>
                            </div>
                        </section>
                    </div>
                }
                footer={
                    <h3>
                        Coded by&nbsp;
                        <Link
                            to='https://github.com/TeaMiroslavic'
                            target='_blank'
                        >
                            Tea Miroslavić
                        </Link>
                    </h3>
                }
            ></Layout>
        </div>
    );
};
export default HomePage;
