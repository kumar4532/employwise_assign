import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../../context/AuthContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const handleLogin = async () => {
        setLoading(true)
        try {
            const res = await fetch("https://reqres.in/api/login", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ email, password })
            })
            const data = await res.json()

            if (!res.ok) {
                console.error('Error logging in', data)
                throw new Error('Error logging in')
            }

            console.log(data)

            localStorage.setItem('token', data.token)
            setAuthUser(data.token);
            toast.success("Logged in successfully")
        } catch (error) {
            toast.error("Error logging in")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex justify-center items-center h-screen bg-white'>
            <fieldset className="fieldset w-xs bg-white border border-base-300 p-4 rounded-box">
                <legend className="fieldset-legend text-2xl text-black">Login</legend>

                <label className="fieldset-label text-lg text-black">Email</label>
                <input type="email" className="input bg-slate-400" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

                <label className="fieldset-label text-lg text-black">Password</label>
                <input type="password" className="input bg-slate-400" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                <button className="btn btn-neutral mt-4" onClick={handleLogin}>
                    {loading ? <span className='loading loading-spinner'></span> : 'Login'}
                </button>
            </fieldset>
        </div>
    )
}

export default Login