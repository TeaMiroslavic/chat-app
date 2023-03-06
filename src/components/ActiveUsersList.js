const activeUsersList = ({ usersList }) => {
    const list = usersList.map((uList) => {
        console.log('UU list', uList);
        return (
            <div key={uList.id}>
                <span>{uList.username}</span>
            </div>
        );
    });
    return <div>{list}</div>;
};

export default activeUsersList;
