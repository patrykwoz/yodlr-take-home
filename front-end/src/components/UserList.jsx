import { useLoaderData } from 'react-router-dom';
import UserListCard from './UserListCard';
import './UserList.css';

function UserList() {
    try {
        const loaderData = useLoaderData()
        const users = loaderData?.users || [];
    } catch (error) {
        console.error("Error in UserList.jsx", error);
    }
    if (!users || users.length < 1) {
        return (
            <div>
                <h2>No users found.</h2>
            </div>
        );
    }
    return (
        <div className="UserList">
            <ul className="UserList-list">
                {users.map(user => (
                    <UserListCard key={user.id} user={user} />
                ))}
            </ul>
        </div>
    );
}

export default UserList;