import styles from './Sidebar.module.css';
import ActiveUsersList from '../ActiveUsersList/ActiveUsersList';
import OfflineUsersList from '../OfflineUsersList/OfflineUsersList';

const Sidebar = ({ usersList, offlineList }) => {
    return (
        <aside className={styles.sidebar}>
            <ActiveUsersList usersList={usersList} />
            <OfflineUsersList offlineList={offlineList} />
        </aside>
    );
};

export default Sidebar;
