import { User } from "../models/user-model.js";
import { fetchFromTMDB } from "../services/TMDB.service.js";

export async function searchPerson(req,res){
    //https://api.themoviedb.org/3/search/person?include_adult=false&language=en-US&page=1

    const {query} =req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        console.log(response.results[0])

        if(response.results.length === 0 ){
            return res.status(404).send(null)
        }
        
        await User.findByIdAndUpdate(req.user._id, {
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].profile_path,
                    title:response.results[0].name,
                    searchType:"person",
                    createdAt:new Date(),
                }
            }
        })

        res.status(200).json({success:true, content:response.results})
    } catch (error) {
        console.log("error in search person controller: ",error.message);
        res.status(500).json({success:false, message:"Internal Error"})
        
    }
}
export async function searchMovie(req,res){
    //https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1

    const {query} = req.params;
    console.log(query);

    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
        console.log(response.results[0]);

        if(response.results.length === 0){
            return res.status(404).send("null")
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    title:response.results[0].title,
                    createdAt: new Date(),
                    image:response.results[0].poster_path,
                    searchType:"Movie",
                },
            },
        });

        res.status(200).json({success:true, content:response.results})


    } catch (error) {
        console.log("error in search movie controller: ",error.message)
        res.status(500).json({success:false, message:"internal error"})
        
    }
}
export async function searchTvShow(req,res){
    //https://api.themoviedb.org/3/search/tv?include_adult=false&language=en-US&page=1

    const {query} = req.params;

    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)

        if(response.results.length === 0){
            return res.status(404).send(null)
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    title:response.results[0].name,
                    image:response.results[0].poster_path,
                    createdAt:new Date(),
                    searchType:"Tv-Show",
                },
            },
        
        });

        res.status(200).json({success:true, content:response.results})
    } catch (error) {
        console.log("error in search Tv show: ",error.message);
        res.status(500).json({success:false, message:"Internal error"})
        
    }
}

export async function searchHistory(req,res){
    try{
        res.status(200).json({success:true, content:req.user.searchHistory})
    }catch(error){
        res.status(500).json({success:false, message:"Internal error"})
    }
}

export async function deleteSearchHistory(req,res){
    let {id}= req.params;

    id=parseInt(id);
    

    try {
        await User.findByIdAndUpdate(req.user._id,{
            $pull:{
                searchHistory:{id:id},
            },
        });

        res.status(200).json({success:true, message:"Search history item is removed"})
    } catch (error) {
        console.log("error in delete search history: ",error.message);
        res.status(500).json({success:false, message:"internal error"})
        
    }

    
}