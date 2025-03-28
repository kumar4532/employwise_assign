import React from 'react'
import useUsers from '../hooks/useUsers'
import { useNavigate } from 'react-router-dom'

const UserCard = ({ page, search }) => {
    const { users, loading, deleteUser } = useUsers(page)
    const navigate = useNavigate()

    const filteredUsers = users.filter(user =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase())
    );

    const editUser = (user) => {
        navigate("/edit", { state: { user } });
    }

    return (
        <div className='flex flex-wrap gap-7'>
            {loading ? (
                <p>Loading users...</p>
            ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                    <div key={user.id} className="card bg-blue-100 w-70 h-[290px] shadow-sm pt-6">
                        <figure>
                            <img src={user.avatar} alt={user.email} width={160} height={160} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{user.first_name} {user.last_name}</h2>
                            <div className="card-actions justify-between">
                                <button className="btn btn-primary" onClick={() => editUser(user)}>Edit</button>
                                <button className="btn btn-error" onClick={() => deleteUser(user.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No users found.</p>
            )}
        </div>
    )
}

export default UserCard