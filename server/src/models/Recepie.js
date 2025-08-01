import { model, Schema, Types } from "mongoose";

const RecepieSchema = new Schema({
    _id: {
        type: String,
        minLength: 4,
    },
    title: {
        type: String,
        minLength: 4,
    },
    ingredients: {
        type: String,
        minLength: 4,
    },
    instructions: {
        type: String
    },
    likes: {
        type: Number,
        min: 0
    },
    imageUrl: {
        type: String,
        required: true,
    },
    _authorId: {
        type: Types.ObjectId,
        ref: 'User',
    },
    createdAt:{
        type: Date
    }
});

const Recepie = model('Recepie', RecepieSchema);

export default Recepie;
