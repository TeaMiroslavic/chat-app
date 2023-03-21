import styles from './OfflineUsersList.module.css';
const OfflineUsersList = ({ offlineList }) => {
    const listOff = offlineList.map((offline) => (
        <li key={offline.id} className='offline-users'>
            <span
                className='avatar'
                style={{ backgroundColor: offline.color }}
            />
            {offline.username}
        </li>
    ));
    return (
        <div className={styles.sidebarOfflineList}>
            <div className={styles.listHeader}>
                <h2>Offline users:</h2>
            </div>
            <ul className={styles.offlineList}>{listOff}</ul>
        </div>
    );
};

export default OfflineUsersList;
