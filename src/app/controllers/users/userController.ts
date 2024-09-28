import bcrypt from 'bcrypt';
// database tools
import userRepository from '../../../database/entities/users/userRepository';
// types
import { Request, Response } from "express";

export default class UserController {

    private userRepository;

    constructor() {
        this.userRepository = userRepository();
    }

    // Arrow functions required to bind implicitly (instead of binding explicitly)

    // get all users
    getAll = async ( _req: Request, res: Response ) => {
        const users = await this.userRepository.find();
        return res.json(users);
    }

    // get user
    getOne = async ( req: Request, res: Response ) => {
        const user = await this.userRepository.findOne({
            where: { username: req.params.username }
        })

        if(!user){
            res.status(404)
            .json({ message: "User not found." });
        }

        return res.json(user);
    }
    
    // create user
    post = async ( req: Request, res: Response ) => {

        const { username, email, password } = req.body;
    
        const existingUsername = await this.userRepository.findOne({
            where: { username }
        });
    
        if(existingUsername){
            return res.status(400)
                .json({ message: "Username already exists." });
        }

        const existingEmail = await this.userRepository.findOne({
            where: { email }
        });
    
        if(existingEmail){
            return res.status(400)
                .json({ message: "Email already registered." });
        }
    
        const passwordHash = await bcrypt.hash(password, 14)
    
        const newUser = this.userRepository.create({
            username, 
            email, 
            password_hash: passwordHash
        })
    
        try{
            const results = await this.userRepository.save(newUser);
            return res.status(201)
                .json({ message: "User created successfully.: ", results });
        }
        catch(err){
            return res.status(500)
                .json({ message: "User creation failed: ", err });
        }
    };

    // update user
    put = async ( req: Request, res: Response ) => {
        const user = await this.userRepository.findOne({
            where: {username: req.params.username}
        })

        if (!user) {
            return res.status(404).json({ message: "Failed to create user - user not found" });
        }

        try{
            this.userRepository.merge(user, req.body);
            await this.userRepository.save(user);
            return res.json(user);
        }
        catch(err){
            return res.status(500)
                .json({ message: "User edit failed: ", err})
        }
    }

    // delete user
    delete = async ( req: Request, res: Response ) => {
        const user = await this.userRepository.findOne({
            where: {id: req.params.id}
        })

        if (!user){
            return res.status(401)
                .json({ message: "Failed to delete user - user not found." })
        }
             
        try{
            const results = await this.userRepository.remove(user)

            return res.status(204)
                .send(results)
        }
        catch(err){
            return res.status(500)
                .json({ message: "Failer to delete user: ", err})
        }
    }
    
}