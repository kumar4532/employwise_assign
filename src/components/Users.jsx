import React, { useState } from 'react'
import UserCard from './UserCard'
import useUsers from '../hooks/useUsers'

const Users = () => {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const { totalPages } = useUsers(page)

    const handlePagination = (e) => {
        setPage(Number(e.target.textContent))
    }

    return (
        <div className='flex flex-col items-center'>
            <label className="input mb-2 w-[800px] bg-white text-black border border-gray-800 rounded-lg flex items-center">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                <input type="search" className="grow" placeholder="Search" onChange={(e) => setSearch(e.target.value)}/>
            </label>

            <UserCard page={page} search={search} />

            <div className="fixed bottom-0 left-0 w-full bg-white py-4 shadow-md flex justify-center">
                {totalPages > 1 && Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                        key={num}
                        onClick={handlePagination}
                        className={`btn ${num === page ? 'btn-primary' : ''}`}
                    >
                        {num}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Users