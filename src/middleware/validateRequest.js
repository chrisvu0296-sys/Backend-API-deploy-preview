import { Schema } from "zod/v3";


export const validateRequest = (schema) =>{
    return (req, res , next) => {
        const result = schema.safeParse(req.body)

    if (!result.success){
        const formatted = result.error.format()
        const flatErrors = Object.values(formatted)
                                .flat()
                                .filter(Boolean)
                                .map((err) => err._errors)
                                .flat()
        console.log(flatErrors);
        


        // const errorMessages = result.error.errors.map((err)=> err.message)
        // const error = errorMessages.join(",")
        return res.status(400).json({message : flatErrors.join(",") })
    }
    next();
    }
}