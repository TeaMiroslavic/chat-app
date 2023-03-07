const Messages = ({ activeUser, messages }) => {
    const usersMessages = messages.map((msg) => {
        const message = msg.message;
        const { member } = msg;
        const currentUser = activeUser.map((user) => user.id);
        const isCurrentSender = currentUser[0] === member.id;

        const messageStyle = {
            textAlign: isCurrentSender ? 'right' : 'left',
            backgroundColor: member.clientData.color,
        };
        return (
            <div key={msg.messageId}>
                <div style={messageStyle}>
                    <span>{member.clientData.username}</span>
                </div>
                <div style={messageStyle}>
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
