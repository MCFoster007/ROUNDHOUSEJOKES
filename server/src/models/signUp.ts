import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from './user.js';

export const signUp = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        console.log(username);
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: 'User with this email already exists' });
        }
        console.log(existingUser);

        const newUser = await User.create({
            username,
            email,
            password,
        });
        console.log(newUser);
        const token = jwt.sign({ id: newUser.id, email: newUser.email}, process.env.JWT_SECRET_KEY!, {
            expiresIn: '1h',
        });
        console.log(token);
        return res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ error: 'An error occured while creating the user' });
    }
};