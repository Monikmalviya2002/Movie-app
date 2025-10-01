import jwt from "jsonwebtoken";
import User from "../models/user.js";



const userAuth = async(req,res,next)=>{
    
     try{
       
        const{token} = req.cookies;
        if(!token){
            throw new Error("Invalid token");
        }
      
      const decodeData = await jwt.verify(token, "Monik@2002");
      const{_id} = decodeData; 
     
      const user = await User.findById(_id);
            if(!user){
              throw new Error("User doesn't exist");
            }
            
           
  req.user = user;
   next();
     
    }catch(err){
          res.status(400).send("ERROR:" + err.message);
    }

} 

export default userAuth;