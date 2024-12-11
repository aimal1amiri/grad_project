import React from 'react'
import { useAuthGlobalState } from '../../store/authUser'

const HomeScreen = () => {
  const {logout}=useAuthGlobalState();
  return (
    <div>
      <button onClick={logout} className=''>logout</button>
    </div>
    
  )
}

export default HomeScreen