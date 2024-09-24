import { AppDataSource } from "./database/data-source";
import { User } from "./database/entities/users/User";
import express from 'express'; // Import Express
import bcrypt from 'bcrypt'
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

AppDataSource.initialize()
    .then(async () => {
        // console.log("Inserting a new user into the database...");
        // const user = new User("Timber", "Saw", 25);
        // await AppDataSource.manager.save(user);
        // console.log("Saved a new user with id: " + user.id);

        // console.log("Loading users from the database...");
        // const users = await AppDataSource.manager.find(User);
        // console.log("Loaded users: ", users);

        // Set up a basic API route
        app.get('/', async (_req, res) => {
            const users = await AppDataSource.manager.find(User);
            res.json(users);
        });

        app.put('/', async (req, res) => {
            console.log('PUT TRIGGERED!')

            const rqBody = req.body;

            const user = await AppDataSource.manager.findOneBy(User, { id: rqBody.id});

            if(user){
                user.username = rqBody.username;
                user.password = rqBody.password;
            }
            
            // const users = await AppDataSource.manager.find(User);
            await AppDataSource.manager.save(user)
            res.json({message: 'Successful PUT BE RESPONSE'})

        })

        app.post('/', async (req, res) => {
            console.log('POST TRIIGGERED')
            const rqBody = req.body;

            const newUser = new User(rqBody.username, rqBody.passwordHash);
            
            await AppDataSource.manager.save(newUser);
            res.json({message: 'Successful POST BE RESPONSE'})
        })

        app.delete('/', async (req, res) => {
            console.log('DELETE TRIGGERED!')

            //const users = await AppDataSource.manager.find(User);
            const user = await AppDataSource.manager.findOneBy(User, { id: req.body.id });

            await AppDataSource.manager.remove(user)
            res.json({message: 'Successful DELETE BE RESPONSE'})
        })


        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    })
    .catch(error => console.log(error));
