import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {response} from 'express'
import User from '../models/user.js';

export const signin = async (req, res) => {
    const {email, password} = req.body;
    
    try{
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message: "Такий користувач не існує"});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: "Неправильний пароль"});

        const token = jwt.sign({email: existingUser.email, id: existingUser._id},'test', {expiresIn: '1h'});

        res.status(200).json({result:existingUser, token});
    }catch(error){
        res.status(500).json({message: "Щось пішло не так"});

    }
}

export const signup = async (req, res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(404).json({message: "Такий користувач вже існує"});

        if(password !== confirmPassword) return res.status(400).json({message: "Паролі не співпадають"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password:hashedPassword, name:`${firstName} ${lastName}`});

        const token = jwt.sign({email: result.email, id: result._id},'test', {expiresIn: '1h'});
        res.status(200).json({result, token});
    }catch(error){
        res.status(500).json({message: "Щось пішло не так"});
    }
}