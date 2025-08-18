import bcrypt from 'bcrypt';

import User from "../models/User.js"
import { generateToken } from '../utils/tokenUtils.js';
import InvalidToken from '../models/InvalidToken.js';

export default {
    async register(userData) {
        const user = await User.create(userData)

        const token = generateToken(user);

        return { user, token };
    },
    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Email or password are incorrect!');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Email or password are incorrect!');
        }

        const token = generateToken(user);

        return { user, token };
    },

    invalidateToken(token) {
        return InvalidToken.create({token});
    },

    async update(userId, data) {
    const user = await User.findByIdAndUpdate(userId, data, { new: true });

    if (!user) {
        throw new Error('User not found');
    }

    return user;
    }

}
