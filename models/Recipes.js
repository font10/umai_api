import mongoose from 'mongoose'

const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: { type: Array, required: true },
    instructions: { type: Array, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    cookingTime: { type: Number, required: true },
    servers: { type: Number, required: true },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
})

export const RecipeModel = mongoose.model("recipes", RecipeSchema);