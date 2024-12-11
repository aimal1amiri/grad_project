import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/home/Home"
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"
import { useAuthGlobalState } from "./store/authUser"
import { useEffect } from "react"


function App() {
  const {user,isCheckingAuth,authChecking}=useAuthGlobalState();

  useEffect(() => {
    authChecking();
  },[]);
  console.log(user)
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />

    </Routes>

    <Toaster/>

    <Footer/>

    </>
  )
}

export default App
