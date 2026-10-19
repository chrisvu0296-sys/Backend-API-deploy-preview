import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});


 const prisma  = new PrismaClient({
    adapter,
    
})

const connectDB = async () =>{
    try {
        await prisma.$connect()
        await prisma.$queryRaw`SELECT 1`;
        console.log("DB connected via prisma");
        
    } catch (error) {
        console.error(`Database connection error : ${error.message}`)
        process.exit(1)  
    }
}

const disconnectDB = async () => {
    await prisma.$disconnect()
    console.log("Database disconnected");
}

export {prisma,connectDB, disconnectDB} 