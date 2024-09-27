import { AppDataSource } from "./database/data-source";
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'; // Import Express
import cors from 'cors';
import userRoutes from "./app/routes/userRoutes";
import authRoutes from "./app/routes/authRoutes";
import csrfRoutes from "./app/routes/csrfRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

AppDataSource.initialize()
    .then(async () => {
        
        app.use("/users", userRoutes);
        app.use("/auth", authRoutes)
        app.use("/csrf", csrfRoutes)

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);

        });

    })
    .catch(error => console.log(error));
