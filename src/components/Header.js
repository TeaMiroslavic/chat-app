const Header = ({ title, theme, logInButton, logOutButton, room, onClick }) => {
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
                <button className='button-login' onClick={onClick}>
                    Log in
                </button>
            )}
            {logOutButton}
            {room}
        </header>
    );
};
export default Header;
