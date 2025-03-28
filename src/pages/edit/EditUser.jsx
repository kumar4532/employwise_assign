import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom'
import useUsers from '../../hooks/useUsers';

const EditUser = () => {
    const location = useLocation();
    const user = location.state?.user;
    const { updateUser, loading } = useUsers();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: user.first_name || "",
        lastname: user.last_name || "",
        email: user.email || ""
    })

    if (!user) {
        return <p>No user data provided!</p>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await updateUser(user.id, formData);
        console.log(success)
        if (success) {
            navigate("/");
        } else {
            toast.error("Failed to update user!");
        }
    };

    return (
        <div className='h-screen bg-white flex flex-col justify-center items-center'>
            <h1 className='text-lg font-semibold'>Edit User</h1>
            <form className='flex flex-col gap-6 border w-80 p-4 text-white' onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input input-primary bg-slate-700"
                    value={formData.firstname}
                    onChange={(e) => setFormData({ firstname: e.target.value })}
                />
                <input
                    type="text"
                    className="input input-primary bg-slate-700"
                    value={formData.lastname}
                    onChange={(e) => setFormData({ lastname: e.target.value })}
                />
                <input
                    type="text"
                    className="input input-primary bg-slate-700"
                    value={formData.email}
                    onChange={(e) => setFormData({ email: e.target.value })}
                />
                <button type='submit' className="btn btn-outline btn-success">
                    {loading ? <span className='loading loading-spinner'></span> : 'Update'}
                </button>
            </form>
        </div>
    )
}

export default EditUser