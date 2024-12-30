import React, { useEffect, useRef, useState } from 'react'
import { useMovieTvContentStore } from '../store/movie&TvContent'
import axios from 'axios';
import { IMAGE_BASE_URL } from '../utils/helperVariables';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MovieTvSlider = ({category}) => {

  const {contentType} = useMovieTvContentStore();

  const contentTypeCaptalized = contentType === "movie" ? "Movies" : "Tv Shows" ;

  const categoryChanging= category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_"," ").slice(1);

  const [content, setContent]=useState([]);

  const [showHideArrow, setShowHideArrow]= useState(false);

  const sliderRef = useRef(null);

  useEffect(() => {
    const getContent = async () => {
      const res= await axios.get(`/api/v1/${contentType}/${category}`)
      setContent(res.data.content);
    }

    getContent();
  }, [contentType, category]);

  const scrollRight= ()=> {
    sliderRef.current.scrollBy({left: sliderRef.current.offsetWidth, behavior: 'smooth'});
  }
  const scrollLeft= ()=>{
    if(sliderRef.current){
      sliderRef.current.scrollBy({left:-sliderRef.current.offsetWidth, behavior: 'smooth'});
    }

  }

  return (
    <div className='bg-black text-white relative px-5 md:px-20 ' onMouseEnter={()=> setShowHideArrow(true)} onMouseLeave={()=> setShowHideArrow(false)}>
      <h2 className='mb-4 text-2xl font-bold'>
        {categoryChanging} {contentTypeCaptalized}

      </h2>

      <div className='flex space-x-4 overflow-x-scroll scrollbar-hide' ref={sliderRef} >
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
      {showHideArrow && (
        <>
        <button className='absolute top-1/3 translate-y-3 left-5 md:left-20 flex justify-center size-12 ml-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white z-10 items-center' onClick={scrollLeft}>
        <ChevronLeft size={24} />

        </button>

        <button className='absolute top-1/3 translate-y-3 right-5 md:right-20 flex justify-center size-12 ml-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white z-10 items-center' onClick={scrollRight}>
        <ChevronRight size={24} />

        </button>
        </>
      )}
    </div>
  )
}

export default MovieTvSlider