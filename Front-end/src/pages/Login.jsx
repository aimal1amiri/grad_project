import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

  const [email, setEmail]=useState("");
  const [pass, setPass]=useState("");

  const handleLoginReq = (e) => {
    e.preventDefault()
    console.log(email, pass)
  }

  return (
    <div className='h-screen w-full hero-bg'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>

        <Link to={"/"}>
        <img src='/netflix-logo.png' alt='logo' className='w-52' />
        </Link> 

</header>

      <div className='flex justify-center items-center mt-20 mx-3'>
        <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md '>
        <h1 className='text-center text-white text-2xl font-bold mb-4 '>
          Login

        </h1>
        <form className='space-y-4 ' onSubmit={handleLoginReq}>
          <div>

            <label htmlFor='' className='text-sm font-medium text-gray-300 block'>
              Email
            </label>
            <input type='email' className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline focus:ring' placeholder='@example.com' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            
          </div>
          <div>
            <label htmlFor='' className='text-sm font-medium text-gray-300 block'>
              Password
            </label>
            <input type='password' className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline focus:ring' placeholder='*******' id='password' value={pass} onChange={(e) => setPass(e.target.value)} /> 
          </div>

          <button className='w-full py-2 bg-red-700 text-white font-semibold rounded-md hover:bg-red-800'>
            Login
          </button>

        </form>
        <div className='text-center text-gray-700'>
          Don't have an account ?
          <Link to={"/signup"} className='text-red-800 px-2'>Sign Up</Link>
        </div>
        
        </div>

      </div>
    </div>
  )
}

export default Login