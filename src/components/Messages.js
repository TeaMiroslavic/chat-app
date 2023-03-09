const Messages = ({ currentUser, messages }) => {
    const usersMessages = messages.map((msg) => {
        const message = msg.message;
        const { member } = msg;
        const isCurrentSender = member.id === currentUser.id;

        const messageStyle = {
            textAlign: isCurrentSender ? 'right' : 'left',
        };

        return (
            <div>
                <div key={member.id} style={messageStyle}>
                    <span>{member.clientData.username}</span>
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
