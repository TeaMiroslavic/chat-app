import styles from './Layout.module.css';
// import { Outlet } from 'react-router-dom';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';
// import { useLocation } from 'react-router-dom';

const Layout = (props) => {
    /* const location = useLocation();
    const isHomePage = location.pathname === '/'; */

    return (
        <div className={styles.layout}>
            <header>
                <img
                    src={process.env.PUBLIC_URL + '/logo-tea.png'}
                    alt='My Logo'
                    className='logo'
                />
                {props.title}
                {props.button}
                {props.children}
            </header>
            <main>{props.content}</main>
            <footer className={styles.mainFooter}>{props.footer}</footer>
        </div>
    );
};
export default Layout;
