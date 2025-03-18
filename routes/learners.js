import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const learnerRouter = express.Router();

// Get a class's learner data
learnerRouter.get("/class/:id", async (req, res) => {
    let collection = await db.collection("learner");
    let query = { class_id: Number(req.params.id) };
    let result = await collection.find(query).toArray();
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});



export default learnerRouter;