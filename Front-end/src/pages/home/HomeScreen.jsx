import React from 'react'
import { useAuthGlobalState } from '../../store/authUser'
import NavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';
import { Info, Play } from 'lucide-react';
import getTrendingContent from '../../hooks/getTrendingContent';
import { MOVIE_CATEGORIES, ORIGINAL_IMAGE_BASE_URL, TV_CATEGORIES } from '../../utils/helperVariables';
import { useMovieTvContentStore } from '../../store/movie&TvContent';
import MovieTvSlider from '../../components/MovieTvSlider';


const HomeScreen = () => {
  const {logout}=useAuthGlobalState();
  const {trendingContent}= getTrendingContent();
  const {contentType} = useMovieTvContentStore();

  //console.log("trend: ",trendingContent)
  //console.log(trendingContent.backdrop_path);

  if(!trendingContent) return (
    <div className='h-screen text-white relative'>
      <NavBar />
      <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer'>

      </div>
    </div>
  )
  return (
    <>
    <div className='realtive h-screen text-white'>

      <NavBar/>

      <img src={ORIGINAL_IMAGE_BASE_URL + trendingContent?.backdrop_path} alt='Hero ' className='absolute top-0 left-0 w-full h-full object-cover -z-50' />

      <div className='absolute top-0 left-0 w-full h-full bg-black/50 -z-50' aria-hidden='true'/>

      <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
        
        <div className='bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10'/>

        <div className='max-w-2xl'>
          <h1 className='mt-4 text-6xl font-extrabold text-balance text-red-700 '> {trendingContent?.title || trendingContent?.name}</h1>
          <p className='mt-2 text-lg'> {trendingContent?.release_date || trendingContent?.first_air_date} {' '}  | {trendingContent.adult ? "18+" : "PG-13"}</p>

          <p className='mt-4 text-lg '>{trendingContent?.overview}</p>
        </div>

        <div className='flex mt-8 '>
          <Link to={`/watch/${trendingContent?.id}`} className='bg-red-700 hover:bg-red-700/80 text-black font-bold py-2 px-4 rounded mr-4 flex ites-center'>
          <Play className='size-6 inline-block mr-2 fill-black '/>
          Play
          </Link>

          <Link to={`/watch/${trendingContent?.id}`} className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center'>
          <Info className='size-6 mr-2'/>
          More Info
          </Link>
        </div>

      </div>


    </div>

    <div className='flex flex-col gap-10 bg-black py-10 '>

      {contentType === "movie" ? (MOVIE_CATEGORIES.map((category) => <MovieTvSlider key={category} category={category} /> )) : (TV_CATEGORIES.map((category) => <MovieTvSlider key={category} category= {category} /> ))}

    </div>

    </>
    
  )
}

export default HomeScreen