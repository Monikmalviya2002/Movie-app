import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({

           title: {
             type: String,
            required: true },
  
         publishingYear:{
          type: Number,
           required: true
                },
              poster: {
             type: String 
               }, 
            }, { timestamps: true });

export default mongoose.model("Movie", movieSchema);
