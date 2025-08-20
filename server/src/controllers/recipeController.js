import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import recipeService from "../service/recipeService.js";

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

// Delete
recipeController.delete('/:recipeId', async (req, res) => {
    const recipeId = req.params.recipeId;

    await recipeService.delete(recipeId);

    res.json({ ok: true });
});

export default recipeController;
