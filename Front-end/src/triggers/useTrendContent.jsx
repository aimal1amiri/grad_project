import React, { useEffect, useState } from 'react'
import { useMovieTvContentStore} from '../store/movie&TvContent.js'

const useTrendContent = () => {
 const {trendContent, setTrendContent} = useState(null);
 const {contentType} = useMovieTvContentStore();


 useEffect(() => (
    const getTrendContent = async () => {
        
    }

    getTrendContent();
 ), [contentType]);
}

export default useTrendContent