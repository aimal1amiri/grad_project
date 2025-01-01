import React, { useState } from 'react'
import { useMovieTvContentStore } from '../store/movie&TvContent';
import NavBar from '../components/NavBar';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL, ORIGINAL_IMAGE_BASE_URL } from '../utils/helperVariables';

const SearchPage = () => {
    const [activeSection , setActiveSection]=useState("movie");
    const [searchValue, setSearchValue]= useState("");

    const [searchValueResult, setSearchValueResult ]= useState([]);
    const {setContentType}= useMovieTvContentStore();

    const sectionClick = (section) => {
        setActiveSection(section);
        section === "movie" ? setContentType("movie") : setContentType("tvShow")
        setSearchValueResult([]);
    }

    //console.log(setContentType);
    //console.log(activeSection)

    const grapValue = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`/api/v1/search/${activeSection}/${searchValue}`);
            setSearchValueResult(response.data.content)
            //console.log("inside: ", response)
        } catch (error) {
            if(error.response.status === 404){
                toast.error("Please check your spelling and the category")
            }
            
        }
    }

    //console.log("results: ",searchValueResult);

  return (
    <div className='bg-black min-h-screen text-white'>
        <NavBar/>

        <div className='container mx-auto px-4 py-8 '>
            <div className='flex justify-center gap-3 mb-4 '>
                <button className={`py-2 px-4 rounded ${activeSection === "movie" ? "bg-orange-500" : "bg-gray-800"} hover:bg-orange-600`} onClick={() => sectionClick('movie')}>
                    Movies 
                </button>

                <button className={`py-2 px-4 rounded ${activeSection === "tvShow" ? "bg-orange-500" : "bg-gray-800"} hover:bg-orange-600`} onClick={() => sectionClick('tvShow')}>
                    Tv Shows
                </button>

                <button className={`py-2 px-4 rounded ${activeSection === "person" ? "bg-orange-500" : "bg-gray-800"} hover:bg-orange-600`} onClick={() => sectionClick('person')}>
                    Person
                </button>
            </div>

            <form className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto ' onSubmit={grapValue}>
                <input type='text' value={searchValue} onChange={(e)=> setSearchValue(e.target.value)} placeholder={"Search for a " + activeSection} className='w-full p-2 rounded bg-gray-800 text-white' />

                <button className='bg-amber-500 hover:bg-amber-600 text-white p-2 rounded'>
                    <Search className='w-6 h-6' />
                </button>
            </form>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {searchValueResult.map((searchValueResult) => {
                    if(!searchValueResult.poster_path && !searchValueResult.profile_path){
                        return null;
                    }

                    return (
                        <div key={searchValueResult.id} className='bg-gray-800 p-8 rounded '>
                            {activeSection === "person" ? (
                                <Link className='flex flex-col items-center'>
                                    <img src={IMAGE_BASE_URL + searchValueResult.profile_path} alt={searchValueResult.name} className='max-h-96 rounded mx-auto' />
                                    <h2 className='mt-2 text-xl font-bold'>
                                        {searchValueResult.name}
                                    </h2>
                                </Link>
                            ) : (
                                <Link to={"/watch/"+ searchValueResult.id} onClick={() => {setSearchValueResult(activeSection)}}>
                                    <img src={ORIGINAL_IMAGE_BASE_URL+searchValueResult.poster_path} alt={searchValueResult.title || searchValueResult.name} className='w-full h-auto rounded '/>
                                    <h2 className='mt-2 text-xl font-bold'> {searchValueResult.title || searchValueResult.name}</h2>
                                </Link>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default SearchPage