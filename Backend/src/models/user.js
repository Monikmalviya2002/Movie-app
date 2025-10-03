import mongoose from "mongoose";


  const UserSchema =  new mongoose.Schema({
      
        emailId : {
            type: String,
            required: true,
        },

        password : {
            type : String,
           required: true, 
        }
      
  },{timestamps:true,})

export default mongoose.model("User", UserSchema);

