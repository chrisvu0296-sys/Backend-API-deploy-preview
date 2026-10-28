import { PrismaClient } from "../src/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});


const prisma  = new PrismaClient({
    adapter,
})


const movies =[
    {
        title : "The godfater",
        overview : "aging patriach of an organized crime dysnaty transfer control to his son",
        releaseYear : 1972,
        genres : ["Crime", "Drama"],
        runtime : 175,
        posterUrl : "https://example.com/godfater.jpg",
        createdBy : userId
    },
    {
       title : "Gooofellas",
        overview : "the story of henry hill and his life mob",
        releaseYear : 1990,
        genres : ["Biography","Crime", "Drama"],
        runtime : 146,
        posterUrl : "https://example.com/goodfellas.jpg",
        createdBy : userId
    }
]

const main = async () =>{
    console.log("Seeding movies...");

    for(const movie of movies){
        await prisma.movie.create({
            data : movie,
        })
        console.log(`Created movie : ${movie.title}`);
        
    }
    console.log("Seeding complete");
    
    
}

main()
.catch((err) => {
    console.log(err);
    process.exit(1);
})
.finally(async() =>{
    await prisma.$disconnect();
})