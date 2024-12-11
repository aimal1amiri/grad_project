import React from 'react'
import HomeScreen from './HomeScreen';
import AuthenticateHome from './AuthenticateHome';
import { useAuthGlobalState } from '../../store/authUser';

const Home = () => {
  const {user}=useAuthGlobalState();
  return (
    <div>
      {user? <HomeScreen/> : <AuthenticateHome/>}
    </div>
  )
}

export default Home