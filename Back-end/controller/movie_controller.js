import { json } from "express";
import { fetchFromTMDB } from "../services/TMDB.service.js";


export async function getTrendingMovie(req,res){
    try {
        const data =await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const RandMovieFromTrending=data.results[Math.floor(Math.random()*data.results?.length)];  //If data.results exists, it will access length. If data.results is null or undefined, instead of throwing an error, it will simply return undefined, and the code execution will not break.

        res.json({success:true,content: RandMovieFromTrending});
    } catch (error) {
        res.status(500).json({success:false,message:"internal server error"});
        
    }

}

export async function getMovieTrailers(req,res){
    const { id }= req.params;
    //console.log(id);
    try {
        
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        res.json({success:true, trailers:data.results}); // why "data.result" ?. when you request to that url it return json which consist of id and results. so to access that result we did that way. and in results might be one trailer or more than one

    } catch (error) {
        console.error("Error fetching trailers:", error.message);
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success:false, message:"internal server error!"});
        
    }
}

export async function getMovieDetails(req,res){
    const {id}=req.params;
    try {
        const data= await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.status(200).json({success:true,message:data});

    } catch (error) {
        console.error("Error fetching trailers:", error.message);
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }

        res.status(500).json({success:false,message:"internal server error"});
    }

}