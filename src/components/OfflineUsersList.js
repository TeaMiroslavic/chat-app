const OfflineUsersList = ({ offlineList }) => {
    const listOff = offlineList.map((offline) => (
        <li key={offline.id}>
            <span
                className='avatar'
                style={{ backgroundColor: offline.color }}
            />
            {offline.username}
        </li>
    ));
    return (
        <div className='offline-list'>
            <h2>Offline users:</h2>
            <ul>{listOff}</ul>
        </div>
    );
};

export default OfflineUsersList;
