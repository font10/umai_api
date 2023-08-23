import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from './routes/users.js';
import { recipesRouter } from './routes/recipes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send(`<h1>Hola</h1>`) })
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect("mongodb+srv://dfont93:Erugerav10_@recipes.pea45wk.mongodb.net/recipes?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true}) 
    .then(() => console.log('Database connected') ) 
    .catch(err => console.error(err))

app.listen( 5000, () => console.log('Server started'))
