import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ChevronRight} from 'lucide-react'

const AuthenticateHome = () => {

    const [email, setEmail]=useState("")

    const navigate=useNavigate();

    const handleSubmit= (e)=>{
        e.preventDefault();
        navigate("/signup?email="+email);
        
    }
  return (
    <div className=' relative'>
        <div className='hero-bg'>
        <video autoPlay muted loop playsInline>
            <source src="/video(1).mp4" type="video/mp4" />
        
        </video>
        </div>




        <header className='max-w-6xl mx-auto flex items-center justify-between p-4 pb-10'>
            <img src='/Cineoss.png' alt='Netlix Logo' className='w-32 md:w-52'/>
            <Link to={"/login"} className='text-white bg-orange-600 py-1 px-2 rounded'>
            Log In
            </Link>

        </header>

        <div className='flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto '>
            <h1 className='text-4xl md:text-6xl font-bold mb-4'>
                Unlimited Movies,<span className='bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent'>TV Shows, and more</span> 
            </h1>
            <p className='text-lg mb-4'>
                Watch anywhere. Cancel anytime.
            </p>
            <p className='mb-4'>Ready to watch? Enter your email to create or restart your membership.</p>

            <form className='flex flex-col md:flex-row gap-4 w-1/2 ' onSubmit={handleSubmit}>
            <input
            type='email'
            placeholder='example@email.com'
            className='p-2 rounded flex-1 bg-black/80 border border-gray-700'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            >
            </input>

            <button className='bg-orange-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 z-20 rounded flex justify-center items-center'>
                Get Started
                <ChevronRight className='size-8 md:size-10'/>
            </button>

            </form>

        </div>

        {/*sperative */}

        <div className='h-2 w-full bg-[#232323]' aria-hidden='true'/>

        <div className='py-10 bg-black text-white z-20 '>
            <div className='flex m-x-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2 z-20'>
                <div className='flex-1 text-center md:text-left py-5'>
                    <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Enjoy on your TV</h2>
                    <p className='text-lg md:text-xl'>
                        Watch on Smart  TVs, PlayStation, Xbox, Apple TV, Blu-ray player, and more.
                    </p>
                                        
                </div>

                <div className='flex-1 relative'>
                    
                    <img src='/tv.png' alt='TV' className='mt-4 relative z-20'/>
                    <video className='absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10 ' playsInline autoPlay={true} muted loop>
                        <source src='/hero-vid.m4v' type='video/mp4' />
                    </video>
                    

                </div>  
            </div>
        </div>
    </div>
  )
}

export default AuthenticateHome