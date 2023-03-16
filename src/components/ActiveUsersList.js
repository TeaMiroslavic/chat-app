const ActiveUsersList = ({ usersList, currentUser }) => {
    console.log('AC:', usersList);
    console.log('CURR', currentUser);
    const list = usersList.map((user) => {
        const isCurrentUser = user.id === currentUser.id;
        return (
            <li key={user.id}>
                {isCurrentUser && <span>YOU:</span>}
                <span
                    className='avatar'
                    style={{ backgroundColor: user.color }}
                />
                {user.username}
            </li>
        );
    });
    return (
        <div className='sidebar'>
            <h2>Active users:</h2>
            <ul>{list}</ul>
        </div>
    );
};

export default ActiveUsersList;
