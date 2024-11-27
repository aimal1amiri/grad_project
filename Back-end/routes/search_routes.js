import express from "express"
import { searchMovie, searchPerson, searchTvShow } from "../controller/search_controller.js";


const router = express.Router()


router.get("/person/:query", searchPerson );
router.get("/movie/:query",searchMovie);
router.get("/tvShow/:query",searchTvShow);





export default router;