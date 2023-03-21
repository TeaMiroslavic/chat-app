import styles from './Footer.module.css';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';
const Footer = ({ input, sendMessage, title }) => {
    return (
        <footer className={styles.mainFooter}>
            {input && <Input sendMessage={sendMessage} />}
            {title && (
                <h3>
                    Coded by&nbsp;<Link to='#'>Tea Miroslavić</Link>
                </h3>
            )}
        </footer>
    );
};

export default Footer;
