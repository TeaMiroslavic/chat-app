import styles from './ActiveUsersList.module.css';
const ActiveUsersList = ({ usersList }) => {
    const list = usersList.map((user) => {
        return (
            <li key={user.id} className={styles.activeUsers}>
                <span
                    className={styles.avatar}
                    style={{ backgroundColor: user.color }}
                />
                {user.username}
            </li>
        );
    });
    return (
        <div className={styles.sidebarActiveList}>
            <div className={styles.listHeader}>
                <h2>Active users:</h2>
            </div>
            <ul className={styles.activeList}>{list}</ul>
        </div>
    );
};

export default ActiveUsersList;
