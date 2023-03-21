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
        <div className='sidebar-offline-list'>
            <div className='list-header'>
                <h2>Offline users:</h2>
            </div>
            <ul className='offline-list'>{listOff}</ul>
        </div>
    );
};

export default OfflineUsersList;
