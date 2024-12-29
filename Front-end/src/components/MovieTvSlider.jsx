import React, { useEffect, useState } from 'react'
import { useMovieTvContentStore } from '../store/movie&TvContent'
import axios from 'axios';
import { IMAGE_BASE_URL } from '../utils/helperVariables';
import { Link } from 'react-router-dom';

const MovieTvSlider = ({category}) => {

  const {contentType} = useMovieTvContentStore();

  const contentTypeCaptalized = contentType === "movie" ? "Movies" : "Tv Shows" ;

  const categoryChanging= category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_"," ").slice(1);

  const [content, setContent]=useState([]);

  useEffect(() => {
    const getContent = async () => {
      const res= await axios.get(`/api/v1/${contentType}/${category}`)
      setContent(res.data.content);
    }

    getContent();
  }, [contentType, category]);

  return (
    <div className='bg-black text-white relative px-5 md:px-20 '>
      <h2>
        {categoryChanging} {contentTypeCaptalized}

      </h2>

      <div className='flex space-x-4 overflow-x-scroll'>
        {content.map((item)=> (
          <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
            <div className='rounded-lg overflow-hidden'>
              <img src={IMAGE_BASE_URL + item.backdrop_path} alt='Movie image' className='transition-transform duration-300 ease-in-out group-hover:scale-125 ' />

            </div>
            <p className='mt-2 text-center'>
              {item.title || item.name}
            </p>
          
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MovieTvSlider