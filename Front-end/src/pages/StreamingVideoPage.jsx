import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useMovieTvContentStore } from '../store/movie&TvContent';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from 'react-player'
import { IMAGE_BASE_URL, ORIGINAL_IMAGE_BASE_URL } from '../utils/helperVariables';
import WaitingPage from './WaitingPage';

const StreamingVideoPage = () => {
  
    const {id} = useParams();
    //console.log(parms)

    const [trailers, setTrailers] = useState([])
    const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
    const [loadingPage, setLoadingPage] = useState(true);
    const [content, setContent]= useState({});
    const [similarContent, setSimilarContent] = useState([]);
    const {contentType} =useMovieTvContentStore();
    const sliderRef= useState(null);


    useEffect(() => {
        const getTrailers = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`)
                setTrailers(res.data.trailers);
            } catch (error) {
                if(error.message.includes('404')){
                    console.log("Sorry, there is no trailer.");
                    setTrailers([])
                }              
            }

        };

        getTrailers();
    },[contentType,id]);

   // console.log("getTrailers:", trailers);


    useEffect(() => {
        const getSimilarContent = async () => {
            try {
                const resp= await axios.get(`/api/v1/${contentType}/${id}/similar`)
                setSimilarContent(resp.data.similar);

            } catch (error) {
               if(error.message.includes('404')){
                console.log("Sorry there is no similar content");
                setSimilarContent([])
               } 
            }
        };
        getSimilarContent();
    }, [contentType, id]);

   // console.log("similar:", similarContent);

    useEffect(() => {
        const getMovieAndTvShowDetails = async () => {
            try {
                const response = await axios.get(`/api/v1/${contentType}/${id}/details`);
                setContent(response.data.message);

                //console.log("inside: ", response)

            } catch (error) {
                if(error.message.includes('404')){
                    setContent(null);
                }
                
            }finally{
                setLoadingPage(false)
            }
        }
        getMovieAndTvShowDetails();
    }, [contentType,id]);

    //console.log("similar:",similarContent)
    //console.log("detials: ",content)

    const showNext = () => {
        if(currentTrailerIndex < trailers.length -1 ) {
            setCurrentTrailerIndex(currentTrailerIndex +1 )
            //console.log("next")
        }
    }
    const showPrevious = () => {
        if(currentTrailerIndex > 0){
          setCurrentTrailerIndex(currentTrailerIndex -1 )
        }
    }


    const scrollRight=() =>{
        if(sliderRef.current){
            sliderRef.current.scrollBy({left: sliderRef.current.offsetWidth, behavior:"smooth"})
        }
    }

    const scrollLeft=() =>{
        if(sliderRef.current){
            sliderRef.current.scrollBy({left: -sliderRef.current.offsetWidth, behavior : "smooth"});
        }
    }


    if(loadingPage){
        return <div className='min-h-screen bg-black p-10'> <WaitingPage/></div>
    }

    if(!content){
        return (
            <div className='bg-black text-white h-screen'>
                <div className='max-w-6xl mx-auto'>
                    <NavBar />
                    <div className='text-center mx-auto px-4 py-8 h-full mt-40'>
                        <h2 className='text-2xl sm:text-5xl font-bold text-balance'>Not Avaliable</h2>
                    </div>
                </div>
            </div>
        )
    }
    

  return (
    <div className='bg-black min-h-screen text-white'>
        <div className='mx-auto container px-4 py-8 h-full'>
            <NavBar />

            {trailers.length>0 && (
                <div className='flex justify-between items-center mb-4 '>
                    <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIndex === 0 ? 'cursor-not-allowed opacity-50' : ""}`} disabled={currentTrailerIndex === 0} onClick={showPrevious}>
                        <ChevronLeft size={24}  />
                    </button>

                    <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIndex === trailers.length -1 ? 'cursor-not-allowed opacity-50' : ""}`} disabled={currentTrailerIndex === trailers.length -1} onClick={showNext}>
                        <ChevronRight size={24} />
                    </button>
                </div>
            )}

            <div className='aspect-video mb-8 p-2 sm:px:10 px-32'>
                {trailers.length > 0 &&(
                    <ReactPlayer controls={true} width={"100%"} height={"70vh"} className=" mx-auto overflow-hidden rounded-lg " url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIndex].key}`}/>
                )};

                {trailers?.length === 0 && (
                    <h2 className='text-xl text-center mt-5'>
                        There is no trailer for {" "}
                        <span className='font-bold text-orange-600'> {content?.title || content?.name}</span>
                    </h2>
                )}
            </div>

            <div className='flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto'>
                <div className='mb-4 md:mb-0'>
                    <h2 className='text-5xl font-bold text-balance'>
                        {content?.title || content?.name} 
                    </h2>

                    <p className='mt-2 text-lg'>
                        {(content?.release_date || content?.first_air_date)} | {" "} {content?.adult ? ( <span className='text-red-600'>18+</span>) : (<span className='text-green-500'>PG-13</span>)} {" "}
                    </p>

                    <p className='mt-4 text-lg'> {content?.overview}</p>
                </div>
                <img src={ORIGINAL_IMAGE_BASE_URL + content?.poster_path}
                alt='Poster image'
                className='max-h-[600px] rounded-md'/>

            </div>

            {similarContent.length > 0 && (
                <div className='mt-12 max-w-5xl mx-auto relative'>
                    <h3 className='text-3xl font-bold mb-4'>
                        Similar {content?.title || content?.name}
                    </h3>
                    <div className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group' ref={sliderRef}>
                        {similarContent.map((content) => {
                            if(content.poster_path === null){
                                return null
                            }
                            return (
                                <Link key={content.id} to={`/watch/${content.id}`} className='w-52 flex-none'> 
                                <img src={IMAGE_BASE_URL+content.poster_path} alt='image path' className='w-full h-auto rounded-md'/> 
                                <h4 className='mt-2 text-lg font-semibold'>{content?.title || content?.name}</h4>
                                </Link>
                            )
                        })}

                        <ChevronRight className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-orange-600 text-white rounded-full' onClick={scrollRight} />
                        <ChevronLeft className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-orange-600 text-white rounded-full' onClick={scrollLeft} />
                    </div>
                </div>
            )}

        </div>
    </div>
  )
}

export default StreamingVideoPage