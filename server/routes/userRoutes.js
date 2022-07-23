import express from 'express';
import User from '../models/users.js';
import bcrypt from 'bcryptjs';
import { generateToken, isAuth } from '../utlis.js';
import expressAsyncHandler from 'express-async-handler';

const userRouter = express.Router();
userRouter.post('/signin', expressAsyncHandler(async(req, res) => {

    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            });
            return;
        }
    }
    res.status(401).send({ message: 'Invaild  email or password' })

}));
userRouter.post('/signup', expressAsyncHandler(async(req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user)
    });
}));
userRouter.put('/profile', isAuth, expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updateUser = await user.save();
        res.send({
            _id: user._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser),
        });
    } else {
        res.status(404).send({ message: 'user not found' });
    }
}))
export default userRouter;