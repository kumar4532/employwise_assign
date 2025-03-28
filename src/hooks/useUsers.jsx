import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const useUsers = (page) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(1)

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const res = await fetch(`https://reqres.in/api/users?page=${page}`)
            const data = await res.json()

            if (!res.ok) {
                throw new Error('Error fetching users')
            }

            setTotalPages(data.total_pages)
            setUsers(data.data)
        } catch (error) {
            console.error('Error fetching users:', error)
            toast.error('Error fetching users')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [page])

    const deleteUser = async (id) => {
        try {
            const res = await fetch(`https://reqres.in/api/users/${id}`, { method: 'DELETE' })

            if (res.ok) {
                toast.success('User deleted successfully')
                setUsers(users.filter(user => user.id !== id))
            } else {
                throw new Error('Error deleting user')
            }
        } catch (error) {
            console.error('Error deleting user:', error)
            toast.error('Error deleting user')
        }
    }

    const updateUser = async (id, updatedData) => {
        setLoading(true)
        try {
            const res = await fetch(`https://reqres.in/api/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            })

            const data = await res.json()

            if (res.ok) {
                toast.success('User edited successfully')
                fetchUsers()
            } else {
                throw new Error('Error editing user')
            }

            return data
        } catch (error) {
            console.error('Error editing user:', error)
            toast.error('Error editing user')
        } finally {
            setLoading(false)
        }
    }

    return { users, loading, totalPages, fetchUsers, deleteUser, updateUser }
}

export default useUsers
