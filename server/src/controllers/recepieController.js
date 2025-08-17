import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import recipeService from "../service/recipeService.js";

const recipeController = Router();

  ///   function buildFilter(query) {
  ///       const filterResult = Object.keys(query).reduce((filter, filterParam) => {
  ///           const filterParamValue = query[filterParam].replaceAll('"', '');
  ///   
  ///           const searchParams = new URLSearchParams(filterParamValue);
  ///           
  ///           return { ...filter, ...Object.fromEntries(searchParams.entries()) };
  ///       }, {})
  ///   
  ///       return filterResult
  ///   };

// Get all
recipeController.get('/', async (req, res) => {
    // buildFilter({ where: '_ownerId="67ace2aed1eaa48b16b4b2eb"&email="ivo@abv.bg"', sortBy: 'createdAt="desc"' });
    ///const filter = buildFilter(req.query);
    
    const recipes = await recipeService.getAll();

    res.json(recipes);
});

// Get one
recipesController.get('/:recipeId', async (req, res) => {
    const recipe = await recipeService.getOne(req.params.recipeId);

    res.json(recipe);
});

// Create
recipeController.post('/', isAuth, async (req, res) => {
    const recipeData = req.body;
    const userId = req.user.id;

    const newRecipe = await recipeService.create(recipeData, userId);

    res.json(newRecipe);
});

// Update
recipeController.put('/:recipeId', async (req, res) => {
    const recipeId = req.params.recipeId;
    const recipeData = req.body;

    const updatedRecipes = await recipeService.update(recipeId, recipeData);

    res.json(updatedRecipe);
});

// Delete
recipeController.delete('/:recipeId', async (req, res) => {
    const recipeId = req.params.recipeId;

    await recipeService.delete(recipeId);

    res.json({ ok: true });
});

export default recipeController;
