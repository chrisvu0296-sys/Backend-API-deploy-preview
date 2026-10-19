
import express from 'express'
import { addToWatchlist,removeFromWatchlist, updateWatchlist } from '../controllers/watchlistController.js'; 
import {authMiddleware} from '../middleware/authMiddleware.js'
import { addToWatchlistSchema } from '../validators/watchlistValidator.js';
import {validateRequest} from '../middleware/validateRequest.js'


const router = express.Router()


router.use(authMiddleware)

router.post("/",validateRequest(addToWatchlistSchema) , addToWatchlist);

//{{baseurl}}/watchlist/:id
router.delete("/:id",removeFromWatchlist )
router.put("/:id",updateWatchlist )




export default router;