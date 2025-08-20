import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import recipeService from "../service/recipeService.js";
import userService from "../service/userService.js";

const recipeController = Router();

 
// Get all
recipeController.get('/', async (req, res) => {
   
    const recipes = await recipeService.getAll();

    res.json(recipes);
});

// Get one
recipeController.get('/:recipeId', async (req, res) => {
    const recipe = await recipeService.getOne(req.params.recipeId);

    res.json(recipe);
});

// Create
recipeController.post('/', isAuth, async (req, res) => {
    const recipeData = req.body;
    const userId = req.user._id;

    try {
        const newRecipe = await recipeService.create(recipeData, userId);
        res.json(newRecipe);
    } catch (err) {
        console.error('Error creating recipe:', err);
        res.status(400).json({ error: err.message });
    }
});

// Update
recipeController.put('/:recipeId', async (req, res) => {
    const recipeId = req.params.recipeId;
    const recipeData = req.body;

    const updatedRecipes = await recipeService.update(recipeId, recipeData);

    res.json(updatedRecipes);
});

// Like a recipe
recipeController.patch('/:recipeId/like', isAuth, async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        const userId = req.user._id;

        const recipe = await recipeService.getOne(recipeId);
        const user = await userService.findById(userId);
        console.log('recipe', recipe, 'user', user)
        

        if (!recipe || !user) {
            return res.status(404).json({ message: 'Recipe or user not found' });
        }


        if (user.likedRecipes.includes(recipeId)) {
            return res.status(400).json({ message: 'You already liked this recipe' });
        }

        recipe.likes += 1;
        await recipe.save();

        user.likedRecipes.push(recipeId);
        await user.save();

        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


// Delete
recipeController.delete('/:recipeId', async (req, res) => {
    const recipeId = req.params.recipeId;

    await recipeService.delete(recipeId);

    res.json({ ok: true });
});

export default recipeController;
