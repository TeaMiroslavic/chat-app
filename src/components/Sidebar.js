import ActiveUsersList from './ActiveUsersList';
import OfflineUsersList from './OfflineUsersList';

const Sidebar = ({
    activeList,
    offList,
    usersList,
    currentUser,
    offlineList,
}) => {
    return (
        <aside className='sidebar'>
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
