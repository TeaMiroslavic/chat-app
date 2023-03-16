import LogIn from './LogIn';

const Main = ({ logIn, handleLogIn }) => {
    return <main>{logIn && <LogIn handleLogIn={handleLogIn} />}</main>;
};

export default Main;
