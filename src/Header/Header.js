import styles from './Header.module.css';
const Header = ({
    title,
    theme,
    logInButton,
    logOutButton,
    room,
    onClick,
    myRoom,
    handleClick,
}) => {
    return (
        <header>
            <img
                src={process.env.PUBLIC_URL + '/logo-tea.png'}
                alt='My Logo'
                className='logo'
            />
            {title && <h1>Spill The Tea</h1>}
            {theme}
            {logInButton && (
                <button className={styles.buttonLogin} onClick={onClick}>
                    Log in
                </button>
            )}
            {room && <span className={styles.myRoom}>#{myRoom}</span>}
            {logOutButton && (
                <button
                    className={styles.buttonLogout}
                    type='button'
                    onClick={handleClick}
                >
                    Log out
                </button>
            )}
        </header>
    );
};
export default Header;
