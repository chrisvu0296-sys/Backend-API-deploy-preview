import jwt from 'jsonwebtoken' 
import { prisma } from '../config/db.js'


//read the token from the request


//check if token is valid

const authMiddleware = async(req , res , next) =>{
    console.log("middlewear reached");
    let token;
    if (req.headers.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];  
    } else if(req.cookies?.jwt) {
        token = req.cookies.jwt
    }

    if(!token) {
        return res.status(401).json({error : "not authorized, no token provided"})
    }

    try {

        console.log("Authorization header exists:",Boolean(req.headers.authorization));
        console.log("Token exists:", Boolean(token));
        console.log("Token parts:", token?.split(".").length);
        //verify token and extract user id
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await prisma.user.findUnique({
            where : {id : decoded.id}
        })
        if(!user){
            return res
            .status(401)
            .json({error : "user no longer exist"})
        }

        req.user = user
        next()
    } catch (error) {
    console.error("Auth middleware error:", error);

    return res.status(401).json({
        error: error.message
    });
}

}

export {authMiddleware}

