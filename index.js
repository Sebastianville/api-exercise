import express from "express";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import router from './routes/grades.js'


//wait to connect to the DB (database)
await mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(e => console.error(e))

const PORT = process.env.PORT || 5050;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API.");
});

app.use('/grades', router)


// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
