import express from 'express'
import { config } from 'dotenv'
import { connectDB , disconnectDB} from './config/db.js';

//import routes
import movieRoutes from "./routes/movieRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import watchlistRoutes from "./routes/watchlistRoutes.js"


config();
connectDB();



const app = express()

//body parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))



//API Routes
app.use('/movies', movieRoutes)
app.use('/auth', authRoutes)
app.use('/watchlist', watchlistRoutes)


const PORT = 3000
const server = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    
})

//Handle unhandled promise rejection (e.g database connection errors)
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1)
    })
})

//Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception", err)
    await disconnectDB()
    process.exit(1)
})

//Graceful shutdown
process.on("SIGTERM", async() => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(async() =>{
        await disconnectDB()
        process.exit(0)
    })
    
})

//GET, POST, PUT, DELETE


//AUTH - signin , signup
//MOVIE - Getting movies
//USER - profile
//WATCHLIST