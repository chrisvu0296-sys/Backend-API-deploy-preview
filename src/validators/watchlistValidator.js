import {z} from 'zod'

const addToWatchlistSchema = z.object({
    movieId : z.string().uuid(),
    status : z.enum([
        "Planned",
        "Watching",
        "Completed",
        "Dropped"
    ], {error : () =>({
        message : "status must be one of : planned ,watching, completed,dropped"
    })
    }).optional(),
    rating : z.coerce.number().int("Rating must be an integer").min(1, "rating must be between 1-10").max(10,"rating must be between 1-10").optional(),
    notes : z.string().optional()
})

export {addToWatchlistSchema}