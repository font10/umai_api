import express from 'express'
import mongoose from 'mongoose'
import { RecipeModel } from '../models/Recipes.js'
import { UserModel } from '../models/Users.js'
import { verifyToken } from './users.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await RecipeModel.find({});
        res.json(response)
    } catch (err) {
        res.json(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.params.id)
        res.json({recipe})
    } catch (err) {
        res.json(err)
    }
})

router.post('/', verifyToken, async (req, res) => {
    const recipe = new RecipeModel(req.body)
    console.log(recipe)
    try {
        const response = await recipe.save();
        res.json(response)
    } catch (err) {
        res.json(err)
    }
})

router.put('/:id', async (req, res) => {
    const recipeFind = await RecipeModel.findByIdAndUpdate({ _id: req.params.id}, req.body)
    console.log(recipeFind)
    try {
        res.json({ response: req.body, success: true })
    } catch (err) {
        res.json(err)
    }
})


router.put("/savedRecipes", verifyToken, async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        res.json(err);
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const recipe = await RecipeModel.findByIdAndDelete(req.params.id)
        if(recipe) res.status(204).send('Borrado correctamente')
    } catch (err) {
        res.json(err)
    }
})

router.get('/savedRecipes/ids/:userID', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        res.json({ savedRecipes: user?.savedRecipes })
    } catch (err) {
        res.json(err)
    }
})

router.get('/savedRecipes/:userID', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes }
        })
        res.json({ savedRecipes })
    } catch (err) {
        res.json(err)
    }
})

router.get('/myRecipes/:userID', async (req, res) => {
    try {
        const id = req.params.userID
        const user = await UserModel.findById(id)
        const recipe = await RecipeModel.find({ userOwner: user._id })
        res.json({ recipe: recipe, user:  user.username, success: true })
    } catch (err) {
        res.json(err)
    }
})

export { router as recipesRouter };
