import { model, Schema, Types } from "mongoose";

const RecipeSchema = new Schema({
  
    title: {
        type: String,
        required: true,
    },
    ingredients: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        min: 0,

    default: 0
    },
    imageUrl: {
        type: String
    },
    _ownerId: {
        type: Types.ObjectId,
        ref: 'User',
    },
    createdAt:{
        type: Date,
         default: Date.now
    }
});

const Recipe = model('Recipe', RecipeSchema);

export default Recipe; /////Recepie;
