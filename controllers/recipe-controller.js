import { RecipeModel } from '../models/Recipes.js'
import { UserModel } from '../models/Users.js'

export const getAllRecipes = async (req, res) => {
  try {
      const response = await RecipeModel.find({}).populate('userOwner')
      res.json(response)
  } catch (err) {
      res.json(err)
  }
}

export const getRecipeById = async (req, res) => {
  try {
      const recipe = await RecipeModel.findById(req.params.id)
      res.json({recipe})
  } catch (err) {
      res.json(err)
  }
}

export const addRecipe = async (req, res) => {
  const recipe = new RecipeModel(req.body)
  
  try {
      const response = await recipe.save();
      res.json(response)
  } catch (err) {
      res.json(err)
  }
}

export const updateRecipe = async (req, res) => {
  console.log(req.params)
  console.log(req.body)
  await RecipeModel.findByIdAndUpdate({ _id: req.params.id}, req.body)

  try {
      res.json({ response: req.body, success: true })
  } catch (err) {
      res.json(err)
  }
}

export const deleteRecipe = async (req, res) => {
  try {
      const recipe = await RecipeModel.findByIdAndDelete(req.params.id)
      if(recipe) res.status(204).send('Borrado correctamente')
  } catch (err) {
      res.json(err)
  }
}

export const getUserRecipes = async (req, res) => {
  try {
      const id = req.params.userID
      const user = await UserModel.findById(id)
      const recipe = await RecipeModel.find({ userOwner: user._id })
      res.json({ recipe: recipe, user:  user.username, success: true })
  } catch (err) {
      res.json(err)
  }
}