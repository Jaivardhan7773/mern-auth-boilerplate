import { Routes, Route ,Navigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Home from "./pages/Home"
import SignUp from "./auth/SignUp"
import Login from "./auth/Login"
import Settings from "./pages/Settings"
import Profile from "./pages/Profile"
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import {Loader} from "lucide-react";
import { Toaster } from "react-hot-toast";
function App() {
const {authUser, checkAuth , isChechingAuth} = useAuthStore()
useEffect(() => {
  checkAuth()


}, [checkAuth]);
// console.log({authUser})

if(isChechingAuth && !authUser)return(
  <div className="flex items-center justify-center h-screen">
    <Loader className="size-10 animate-spin"/>
  </div>
)

  return (
    <>

      <Navbar />
      <Routes>
        <Route path='/' element={authUser ?<Home /> : <Navigate to={"/login"}/>} />
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path='/profile' element={authUser ? <Profile/> : <Navigate to={"/login"}/>} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
