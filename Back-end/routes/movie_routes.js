import express from "express";
import { getTrendingMovie,getMovieTrailers, getMovieDetails } from "../controller/movie_controller.js";



const router=express.Router();

router.get("/trending",getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);

export default router;