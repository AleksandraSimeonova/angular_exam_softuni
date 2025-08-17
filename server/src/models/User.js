import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
     
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[\w.-]+@gmail\.(com|bg)$/, 'Invalid email format']
    },
    password: {
        type: String,
        required: true,
        minlength: [5, 'Password should be at least 5 characters'],
        validate: {
            validator: function (v) {
                return /[a-zA-Z0-9]+/g.test(v);
            },
            message: props => `${props.value} must contains only latin letters and digits!`
        },
    },

    postedRecipes: [{
        type: ObjectId, ////Schema.Types.ObjectId
        ref: "Recipe"
    }],

    likedRecipes: [{
        type: ObjectId,
        ref: "Recipe"
    }]


});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', userSchema);

export default User;
