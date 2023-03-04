const Messages = ({ activeUser, messages }) => {
    const usersMessages = messages.map((msg) => {
        const message = msg.message;
        const isCurrentSender = msg.clientId === activeUser.id;

        const messageStyle = {
            textAlign: isCurrentSender ? 'right' : 'left',
        };

        return (
            <div>
                <div key={activeUser.id} style={messageStyle}>
                    <span>{isCurrentSender && activeUser.username}</span>
                </div>
                <div key={msg.messageId} style={messageStyle}>
                    <span>{message}</span>
                </div>
            </div>
        );
    });

    return (
        <div>
            <span>{usersMessages}</span>
        </div>
    );
};

export default Messages;
