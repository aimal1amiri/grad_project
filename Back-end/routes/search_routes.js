import express from "express"
import { searchMovie, searchPerson, searchTvShow, searchHistory, deleteSearchHistory } from "../controller/search_controller.js";


const router = express.Router()


router.get("/person/:query", searchPerson );
router.get("/movie/:query",searchMovie);
router.get("/tvShow/:query",searchTvShow);

router.get("/history",searchHistory);
router.delete("/history/:id",deleteSearchHistory);





export default router;