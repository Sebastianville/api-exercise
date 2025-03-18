import express from "express";
import dotenv from "dotenv";
dotenv.config();

import router from './routes/grades.js'
import learnerRouter from "./routes/learners.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API.");
});

app.use('/grades', router)
app.use('/learners', learnerRouter)

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
