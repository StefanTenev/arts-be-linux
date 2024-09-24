import { User } from "@/database/entities/users/User";
import { Request, Response } from "express";
import { AppDataSource } from "@/database/data-source";
import bcrypt from 'bcrypt';

const getUser = async ( req: Request, res: Response ) => {

    const { username, email } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ username });

    if(!existingUser){
        return res.status(400)
            .json({ message: "User does not exist." });
    }

    const passwordHash = await bcrypt.hash(password, 14)

    const newUser = new User(
        username,
        email,
        passwordHash
    );

    try{
        await userRepository.save(newUser);
        res.status(201)
            .json({ message: "User successfully registered." });
    }
    catch(err){
        res.status(500)
            .json({ message: "User registration failed: ", err });
    }
};

const postUser = async ( req: Request, res: Response ) => {

    const { username, email, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ username });

    if(existingUser){
        return res.status(400)
            .json({ message: "Username already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 14)

    const newUser = new User(
        username,
        email,
        passwordHash
    );

    try{
        await userRepository.save(newUser);
        res.status(201)
            .json({ message: "User successfully registered." });
    }
    catch(err){
        res.status(500)
            .json({ message: "User registration failed: ", err });
    }
};

const deleteUser = async ( req: Request, res: Response ) => {

    const { username, email, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ username });

    if(!existingUser){
        return res.status(400)
            .json({ message: "User does not exist." });
    }

    const passwordHash = await bcrypt.hash(password, 14)

    const isMatch = await bcrypt.compare(password, existingUser.password_hash)

    const passwordHash = await bcrypt.hash(password, 14)

    const newUser = new User(
        username,
        email,
        passwordHash
    );

    try{
        await userRepository.save(newUser);
        res.status(201)
            .json({ message: "User successfully registered." });
    }
    catch(err){
        res.status(500)
            .json({ message: "User registration failed: ", err });
    }
};

module.exports = { 
    postUser,
    getUser, 
    deleteUser
 }


