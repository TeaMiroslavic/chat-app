import styles from './Sidebar.module.css';
import ActiveUsersList from '../ActiveUsersList/ActiveUsersList';
import OfflineUsersList from '../OfflineUsersList/OfflineUsersList';

const Sidebar = ({
    activeList,
    offList,
    usersList,
    currentUser,
    offlineList,
}) => {
    return (
        <aside className={styles.sidebar}>
            {activeList && (
                <ActiveUsersList
                    usersList={usersList}
                    currentUser={currentUser}
                />
            )}
            {offList && <OfflineUsersList offlineList={offlineList} />}
        </aside>
    );
};

export default Sidebar;
