import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import { createUserTable } from "./data/createUserTable.js";

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