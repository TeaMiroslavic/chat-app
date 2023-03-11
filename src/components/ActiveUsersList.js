const ActiveUsersList = ({ usersList }) => {
    const list = usersList.map((user) => (
        <li key={user.id}>
            <span className='avatar' style={{ backgroundColor: user.color }} />
            {user.username}
        </li>
    ));
    return (
        <div className='sidebar'>
            <h2>Active users:</h2>
            <ul>{list}</ul>
        </div>
    );
};

export default ActiveUsersList;
