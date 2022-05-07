import jwt from "jsonwebtoken"
import User from "../models/user.js";
export const authAdmin = async (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        
        if(token == null ) return res.status(403)
        //verify token 


        jwt.verify(token,'test', async (err,existingUser) => {
            if (err) return res.sendStatus(403)
            console.log(existingUser.existingUser.email)
            const email = existingUser.existingUser.email
            const user = await User.findOne({email}); 
            if (user.type != 'admin') return res.sendStatus(401);
            req.user = user;

        })

        next();
    }catch(error){
        res.status(401).json({message:'you are not authorized'})
    }
}
export const authEmpolyee = async (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        
        if(token == null ) return res.status(403)
        //verify token 


        jwt.verify(token,'test', async (err,existingUser) => {
            if (err) return res.sendStatus(403)
            const email = existingUser.existingUser.email
            const user = await User.findOne({email}); 
            if (user.type != 'employee') return res.sendStatus(401);
            req.user = user;

        })

        next();
    }catch(error){
        res.status(401).json({message:'you are not authorized'})
    }
}
