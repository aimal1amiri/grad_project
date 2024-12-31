import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import { IMAGE_BASE_URL } from '../utils/helperVariables';
import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';

const HistoryPage = () => {

    const [searchHistoryData, setSearchHistoryData]=useState([]);

    useEffect(() => {
        const obtainSearchHistory = async ()=>{
            try {
                const response =await axios.get(`/api/v1/search/history`)
                setSearchHistoryData(response.data.content);

            } catch (error) {
                console.log(error.message);
                setSearchHistoryData([]);
            }
        }
        obtainSearchHistory();
        },[])

        

        if(searchHistoryData?.length === 0 ){
            return (
                <div className='bg-black min-h-screen text-white'>
                    <NavBar />
                    <div className='max-w-6xl mx-auto px-4 py-8'>
                        <h1 className='text-3xl font-bold mb-8'>
                            Search History
                        </h1>
                        <div className='flex justify-center items-center h-98'>
                            <p className='text-xl'> There is no search history found</p>
                        </div>
                    </div>
                </div>
            )
        }

        const deleteSearchHistoryData = async (value) => {
            //console.log("front-end-id: ",value.id)
            try {
                //("hit the point")
                const response= await axios.delete(`/api/v1/search/history/${value.id}`);
                
                toast.success(response.data.message);
                
                setSearchHistoryData(searchHistoryData.filter((data) => data.id !== value.id))
            } catch (error) {
                toast.error("It cannot delete!")
                //console.log(error)
                
            }
        }


  return (
    <div className='bg-black text-white min-h-screen'>
        <NavBar/>
        <div className='max-w-6xl mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold mb-8'>
                Search History
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {searchHistoryData?.map((value) => (
                    <div className='bg-gray-800 p-4 rounded flex items-start' key={value.id}>
                        <img src={IMAGE_BASE_URL+value.image} alt='Image' className='size-16 rounded-full object-cover mr-4 '/>

                        <div className='flex flex-col'>
                            <span className='text-white text-lg'>
                                {value.title}
                            </span>
                            <span className='text-gray-400 text-sm'>{value.createdAt}</span>
                        </div>
                        <span className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
                            //if(value.searchType==="movie")
                            value.searchType === "Movie" ? "bg-orange-600" : value.searchType === "Tv-Show" ? "bg-amber-400" : "bg-yellow-700"
                        }`}>
                            {value.searchType}
                        </span>

                        <Trash className='size-5 ml-4 cursor-pointer hover:fill-orange-600 hover:text-orange-600' onClick={()=> deleteSearchHistoryData(value)} />

                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default HistoryPage