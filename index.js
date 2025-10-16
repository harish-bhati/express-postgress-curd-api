import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import { createUserTable } from './src/data/createUserTable.js';
import errorHandler from './src/middlewares/errorHandler.js';
import pool from './src/config/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(cors());
app.use(express.json());

//ROUTES
app.use("/api", userRoutes);

// Error handling middleware
 app.use(errorHandler)

// create user table if not exists
createUserTable();

//test postgres connection
app.get("/", async (req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`Connected to database: ${result.rows[0].current_database}`);
});   


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});