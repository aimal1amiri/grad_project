import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <div className='min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white' style={{backgroundImage:"url('/4044.jpg')"}}>
        <header className='absolute top-0 left-0 p-4 bg-black w-full'>

            <Link to={"/"}>
            <img src='/netflix-logo.png' alt='logo' className='h-8'/>
            </Link>


        </header>

        <main className='text-center error-page--content z-10'>
            <h1 className='text-7xl font-semibold mb-4'>
            Don't worry, even the best explorers get lost sometimes.
            </h1>

            <p className='mb-6 text-xl font-bold'>
            You seem to have taken a wrong turn.
            </p>

            <Link to={"/"} className='bg-white text-black py-2 px-4 rounded'>
            Home
            </Link>
        </main>

    </div>
  )
}

export default Page404