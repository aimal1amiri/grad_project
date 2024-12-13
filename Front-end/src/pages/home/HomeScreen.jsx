import React from 'react'
import { useAuthGlobalState } from '../../store/authUser'
import NavBar from '../../components/NavBar';

const HomeScreen = () => {
  const {logout}=useAuthGlobalState();
  return (
    <>
    <div className='realtive h-screen text-white bg-black'>

      <NavBar/>
    </div>

    </>
    
  )
}

export default HomeScreen