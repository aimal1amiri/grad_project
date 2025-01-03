import { set } from 'mongoose';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {LogOut, Menu, Search} from 'lucide-react'
import { useAuthGlobalState } from '../store/authUser';
import { useMovieTvContentStore } from '../store/movie&TvContent';

const NavBar = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const {user, logout} = useAuthGlobalState();

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const {setContentType} = useMovieTvContentStore()

    //console.log(contentType);
    

  return (
    <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
        
        <div className='flex items-center gap-10 z-50 '>

            <Link to="/">
            <img src='/Cineoss.png' alt='Netflix Logo' className='w-32 sm:w-40'/>
            </Link>

            {/*for desktop */}
            <div className='hidden sm:flex gap-4 items-center'>
                <Link to='/' className=' font-semibold hover:underline hover:text-orange-400' onClick={()=> setContentType('movie')}>
                Movies
                </Link>

                <Link to='/' className='font-semibold hover:underline hover:text-orange-400' onClick={()=> setContentType('tvshow')}>
                TV Shows
                </Link>

                <Link to='/history' className='font-semibold hover:underline hover:text-orange-400'>
                Search History 
                </Link>

            </div>


        </div>

        <div className='flex gap-2 items-center z-50'>
            <Link to={"/search"}>
            <Search className='size-6 hover:text-orange-500 cursor-pointer'/>
            </Link>

            <img src={user.image} alt='Avatar' className='h-8 rounded cursor-pointer'/>
            <LogOut className='size-6 hover:text-orange-500 cursor-pointer ' onClick={logout} />

            <div className='sm:hidden'>
                <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu}/>
            </div>
        </div>

        {isMobileMenuOpen && (
            <div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>

                <Link to={"/"} className='font-semibold block hover:underline p-2 hover:text-orange-400' onClick={toggleMobileMenu}>
                Movies                
                </Link>

                <Link to={"/"} className='font-semibold block hover:underline p-2 hover:text-orange-400' onClick={toggleMobileMenu}>
                TV Show
                </Link>

                <Link to={"/history"} className='font-semibold block hover:underline p-2 hover:text-orange-4    00' onClick={toggleMobileMenu}>
                Search History
                </Link>
            </div>
        )}


    </header>
  )
}

export default NavBar