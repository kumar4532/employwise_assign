import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { useAuthContext } from './context/AuthContext'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import EditUser from './pages/edit/EditUser'
import { Toaster } from 'react-hot-toast'

function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={authUser ? <Navigate to={"/"} /> : <Login />} />
          <Route path="/edit" element={authUser ? <EditUser /> : <Login />} />
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App
