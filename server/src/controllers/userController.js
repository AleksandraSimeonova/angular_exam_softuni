import { Router } from "express";

import userService from "../service/userService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const userController = Router();

userController.post('/register', async (req, res) => {
    const userData = req.body;

    const { user, token } = await userService.register(userData);

    res.json({
        _id: user.id,
        name: user.name,
        accessToken: token,
        email: user.email,
        postedRecipes: user.postedRecipes || [], 
        likedRecipes: user.likedRecipes || [],  
    });
});

userController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const { user, token } = await userService.login(email, password)

    res.json({
        _id: user.id,
        accessToken: token,
        email: user.email,
    });
});

userController.get('/logout', isAuth, async (req, res) => {
    const token = req.headers['x-authorization'];

    await userService.invalidateToken(token);

    res.json({});
});

userController.put('/:id', isAuth, async (req, res) => {
    try {

        const userId = req.params.id;

        // Ако userId не съвпада с този в токена (req.user._id)
        if (req.user._id !== userId) {
            return res.status(403).json({ message: 'Not authorized to update this user' });
        }

        const updateData = req.body;

        const updatedUser = await userService.update(userId, updateData);

        res.json({
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            postedRecipes: updatedUser.postedRecipes || [],
            likedRecipes: updatedUser.likedRecipes || [],
            
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default userController;
