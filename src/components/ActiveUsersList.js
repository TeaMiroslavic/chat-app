const ActiveUsersList = ({ usersList }) => {
    console.log('AC:', usersList);
    const list = usersList.map((user) => {
        return (
            <li key={user.id} className='active-users'>
                <span
                    className='avatar'
                    style={{ backgroundColor: user.color }}
                />
                {user.username}
            </li>
        );
    });
    return (
        <div className='sidebar-active-list'>
            <div className='list-header'>
                <h2>Active users:</h2>
            </div>
            <ul className='active-list'>{list}</ul>
        </div>
    );
};

export default ActiveUsersList;
