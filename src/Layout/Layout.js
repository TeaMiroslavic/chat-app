import styles from './Layout.module.css';

const Layout = (props) => {
    return (
        <div className={styles.layout}>
            <header>
                <img
                    src={process.env.PUBLIC_URL + '/logo-tea.png'}
                    alt='My Logo'
                    className='logo'
                />
                {props.title}
                <button
                    className={styles.themeButton}
                    onClick={props.toggleTheme}
                >
                    {props.theme}
                </button>
                {props.button}
                {props.children}
            </header>
            <main>{props.content}</main>
            <footer className={styles.mainFooter}>{props.footer}</footer>
        </div>
    );
};
export default Layout;
