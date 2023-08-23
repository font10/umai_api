import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import { UserModel } from '../models/Users.js'

const router = express.Router();

router.post("/register", async ( req, res ) => {
    const { username, password } = req.body;
    
    const user = await UserModel.findOne({ username });

    if( user ) {
        return res.json({ message: "User already exists" })
    }
    const hashedPassword = await bcrypt.hash( password, 10 );

    const newUser = UserModel({ username: username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered" });
});

router.post("/login", async ( req, res ) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });

        if( !user ) {
            return res.json({ message: "User doesn't exists" })
        }

        //? Comparem si el pass escrit i el de Mongo son iguals
        const isPasswordValid = await bcrypt.compare( password, user.password );

        if(isPasswordValid) {
            const token = jwt.sign({ id: user._i }, "secret" );
            res.json({ token, userID: user._id, name: user.username })
        } else {
            res.json({
                error: "Wrong credentials",
            })
        }
    } catch(err) {
        console.log(err)
        res.status(400).send(error.message) 
    }
});

router.get('/user/:id', async ( req, res ) => {
    try {
        const { id } = req.params
        const user = await UserModel.findOne({ _id: id });
        return res.json({ username: user.username })
    } catch(err) {
        console.log(err)
        res.status(400).send(error.message)
    }
})

export { router as userRouter };

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if( token ) {
        jwt.verify(token, "secret", (err) => {
            if (err) return res.sendStatus(403)
            next()
        })
    } else {
        res.sendStatus(401)
    }
}