const ActiveUsersList = ({ usersList }) => {
    const list = usersList.map((user) => (
        <li key={user.id}>{user.username}</li>
    ));
    return (
        <div>
            <ul>{list}</ul>
        </div>
    );
};

export default ActiveUsersList;
