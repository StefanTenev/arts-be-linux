import { AppDataSource } from "./database/data-source";
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'; // Import Express
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoutes from "./app/routes/userRoutes";
import authRoutes from "./app/routes/authRoutes";
import csrfRoutes from "./app/routes/csrfRoutes";
import foodRoutes from "@routes/foodRoutes";
import userFoodListRoutes from "@routes/userFoodListRoutes";

import { credentialsMiddleware } from "./app/middleware/credentials";

// import { vCSRFTMiddleware } from "app/middleware/verifyCSRFT";
// import { vJWTMiddleware } from "app/middleware/verifyJWT";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(credentialsMiddleware)

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));

app.use(cookieParser()); // Use cookie parser middleware
// app.use(vCSRFTMiddleware)

AppDataSource.initialize()
    .then(async () => {
        
        app.use("/users", userRoutes);
        app.use("/foods", foodRoutes)
        app.use("/userFoodList", userFoodListRoutes)
        app.use("/auth", authRoutes)
        app.use("/csrf", csrfRoutes)

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);

        });

    })
    .catch(error => console.log(error));
