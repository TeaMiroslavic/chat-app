import { useRef, useEffect } from 'react';

const Messages = ({ currentUser, messages }) => {
    const scrollToRef = useRef(null);
    useEffect(() => {
        scrollToRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const usersMessages = messages.map((msg) => {
        const message = msg.message;
        const time = msg.time;
        const { member } = msg;

        const isCurrentSender = member.id === currentUser.id;
        const className = isCurrentSender ? 'message-sent' : 'message-received';

        const luminance =
            (0.299 * member.clientData.color.r +
                0.587 * member.clientData.color.g +
                0.114 * member.clientData.color.b) /
            255;

        const textColor = luminance > 0.5 ? '#000000' : '#FFFFFF';

        return (
            <div className={className} key={msg.messageId}>
                <div className='chat-messages'>
                    <div className='username'>{member.clientData.username}</div>
                    <div className='msg'>
                        <span
                            style={{
                                backgroundColor: member.clientData.color,
                                color: textColor,
                            }}
                        >
                            {message}
                        </span>
                    </div>
                    <div className='time'>{time}</div>
                </div>
            </div>
        );
    });

    return (
        <main>
            {usersMessages}
            <div ref={scrollToRef} />
        </main>
    );
};

export default Messages;
