import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/home/Home"
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"
import { useAuthGlobalState } from "./store/authUser"
import { useEffect } from "react"
import { Loader } from "lucide-react"


function App() {
  const {user,isCheckingAuth,authChecking}=useAuthGlobalState();

  useEffect(() => {
    authChecking();
  },[]);
  console.log(user)

  if(isCheckingAuth){
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    )
  }
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={!user ? <Login/> : <Navigate to={"/"} /> } />
      <Route path="/signup" element={!user ? <Signup/> : <Navigate to={"/"}/> } />

    </Routes>

    <Toaster/>

    <Footer/>

    </>
  )
}

export default App
