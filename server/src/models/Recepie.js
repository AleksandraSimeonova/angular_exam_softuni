import { model, Schema, Types } from "mongoose";

const RecepieSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
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
        min: 0
    },
    imageUrl: {
        type: String
    },
    _ownerId: {
        type: Types.ObjectId,
        ref: 'User',
    },
    createdAt:{
        type: Date
    }
});

const Recepie = model('Recepie', RecepieSchema);

export default Recepie;
