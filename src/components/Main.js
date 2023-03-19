import LogIn from './LogIn';
import Messages from './Messages';
const Main = ({
    logIn,
    handleLogIn,
    messageContent,
    currentUser,
    messages,
}) => {
    return (
        <main>
            {logIn && <LogIn handleLogIn={handleLogIn} />}
            {messageContent && (
                <Messages currentUser={currentUser} messages={messages} />
            )}
        </main>
    );
};

export default Main;
