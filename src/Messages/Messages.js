import styles from './Messages.module.css';
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
        const className = isCurrentSender
            ? styles.messageSent
            : styles.messageReceived;

        const luminance =
            (0.299 * member.clientData.color.r +
                0.587 * member.clientData.color.g +
                0.114 * member.clientData.color.b) /
            255;

        const textColor = luminance > 0.5 ? '#000000' : '#FFFFFF';

        return (
            <div className={className} key={msg.messageId}>
                <div className={styles.chatMessages}>
                    <div className={styles.username}>
                        {member.clientData.username}
                    </div>
                    <div className={styles.msg}>
                        <span
                            style={{
                                backgroundColor: member.clientData.color,
                                color: textColor,
                            }}
                        >
                            {message}
                        </span>
                    </div>
                    <div className={styles.time}>{time}</div>
                </div>
            </div>
        );
    });

    return (
        <div className={styles.mainMessages}>
            {/* <img
                src={process.env.PUBLIC_URL + '/tea-chat.png'}
                alt='Background image'
                className='bg-image'
            /> */}
            {usersMessages}
            <div ref={scrollToRef} />
        </div>
    );
};

export default Messages;
