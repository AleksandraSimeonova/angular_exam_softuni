import Recipe from "../models/Recipe.js";

export default {
    getAll(filter = {}) {
        return Recipe.find(filter);
    },
    getOne(recipeId) {
        return Recipe.findById(recipeId);
    },
    create(recipeData, userId) {
        return Recipe.create({ ...recipeData, _ownerId: userId });
    },
    update(recipeId, recipeData) {
        return Recipe.findByIdAndUpdate(recipeId, recipeData);
    },
    delete(recipeId) {
        return Recipe.findByIdAndDelete(recipeId);
    }
}
