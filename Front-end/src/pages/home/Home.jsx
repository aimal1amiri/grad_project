import React from 'react'
import HomeScreen from './HomeScreen';
import AuthenticateHome from './AuthenticateHome';

const Home = () => {
  const user=false;
  return (
    <div>
      {user? <HomeScreen/> : <AuthenticateHome/>}
    </div>
  )
}

export default Home