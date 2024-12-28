import React, { useEffect, useState } from 'react'
import { useMovieTvContentStore } from '../store/movie&TvContent';
import axios from 'axios';

const getTrendingContent = () => {
  const [trendingContent, setTrendingContent]= useState(null);
  const {contentType}=useMovieTvContentStore();

  useEffect(() => {
    const getTrendingContent = async () =>{
        const res= await axios.get(`/api/v1/${contentType}/trending`);
        setTrendingContent(res.data.content);
    }

    getTrendingContent();
  }, [contentType]);

  return {trendingContent};
}

export default getTrendingContent