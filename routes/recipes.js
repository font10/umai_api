import express from 'express'
import { verifyToken } from '../utils/index.js';
import { addRecipe, deleteRecipe, getAllRecipes, getRecipeById, getUserRecipes, updateRecipe } from '../controllers/recipe-controller.js';

const router = express.Router();

router.get('/', getAllRecipes)
router.get('/:id', getRecipeById)
router.post('/', verifyToken, addRecipe)
router.put('/:id', updateRecipe)
router.delete('/:id', verifyToken, deleteRecipe)
router.get('/myRecipes/:userID', getUserRecipes)

export { router as recipesRouter };
