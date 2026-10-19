
import {prisma} from '../config/db.js'

const addToWatchlist = async(req , res ) =>{
    const {movieId, status , rating, notes} = req.body;

    //verify movie exist
    const movie = await prisma.movie.findUnique({
        where : {id : movieId}
    });
    if (!movie){
        return res.status(401).json({error : "movie not found"})
    };


    //check if already add
    const existingWatchlist = await prisma.watchlistItems.findUnique({
        where : {userId_movieId : {
            userId : req.user.id,
            movieId : movieId,
        }},
    })
    if (existingWatchlist){
        return res.status(401).json({error : "movie already exist in watchlist"})
    };

    const watchlistItem = await prisma.watchlistItems.create({
        data : {
            userId : req.user.id,
            movieId,
            status : status || "Planned",
            rating,
            notes,
        }
    });

    res.status(201).json({
        status : "success",
        data : {
            watchlistItem,
        }
    })
}

const removeFromWatchlist = async (req , res )=>{
    //find watchlist item and verify ownership
    const watchlistItem = await prisma.watchlistItems.findUnique({
        where : {id : req.params.id}
    })

    if(!watchlistItem){
        return res.status(404).json({error : "Watchlist item not found"})
    }

    //Ensure owner can delete
    if(watchlistItem.userId !== req.user.id){
        return res.status(403).json({error : " not allowed to update this watchlist item"})
    }

    await prisma.watchlistItems.delete({
        where : {id : req.params.id}
    })

    res.status(200).json({
        status : "success",
        message : "moive removed from watchlist"
    })
}

const updateWatchlist = async (res , req) => {
    const {status, rating , notes} = req.body
    
    //find watchlist item and verify ownership
    const watchlistItem = await prisma.watchlistItems.findUnique({
        where : {id : req.params.id}
    })

    if (!watchlistItem) { 
        return res.status(404).json({error : "watchlist item not found"})
    }

    //ensure only owner can update
    if(watchlistItem.userId !== req.user.id) {
        return res.status(403).json({error : "not allowed to update this watchlist item"})
    }

    //build update watchlist
    const updateData = {}
    if(status !== undefined) updateData.status = status.toUpperCase()
    if(rating !== undefined) updateData.rating = rating
    if(notes !== undefined) updateData.notes = notes 
}

export {addToWatchlist,removeFromWatchlist, updateWatchlist}