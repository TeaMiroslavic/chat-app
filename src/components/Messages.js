const Messages = ({ activeUser, messages }) => {
    const usersMessages = messages.map((msg) => {
        const message = msg.message;
        const { member } = msg;
        const currentUser = activeUser.map((user) => user.id);
        const isCurrentSender = currentUser[0] === member.id;

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
