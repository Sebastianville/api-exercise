import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";
import Grades from "../models/grades.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const grades = await Grades.find();
    res.status(200.).json(grades)
  } catch (e) {
    res.status(500).send(error.message);
  }
})



//GET/grades/:id
// Get a single grade entry
router.get("/:id", async (req, res) => {
  // let collection = await db.collection("grades");
  // let query = { _id: new ObjectId(req.params.id) };
  // let result = await collection.findOne(query);
  //! The 3 lines above is now written in one line below
  let result = await Grades.findById(req.params.id)

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});


// // Get a student's grade data
// router.get("/student/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { learner_id: Number(req.params.id) };
//   let result = await collection.find(query).toArray();

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// Student route for backwards compatibility. We changed the name student to learner in the database. 
router.get("/student/:id", async (req, res) => {
  res.redirect(`/grades/learner/${req.params.id}`);
});

// Get a learner's grade data
router.get("/learner/:id", async (req, res) => {
  // let collection = await db.collection("grades");
  // let query = { learner_id: Number(req.params.id) };
  // let result = await collection.find(query).toArray();

  let result = await Grades.findOne({learner_id: req.params.id})

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});


// Get a class's grade data
router.get("/class/:id", async (req, res) => {
  // let collection = await db.collection("grades");
  // let query = { class_id: Number(req.params.id) };
  // let result = await collection.find(query).toArray();

  let result = await Grades.findOne({class_id: req.params.id})



  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.post("/", (req, res) => {
  try {
    const grade = new Grades(req.body)
    const savedGrade = grade.save()
    res.json(savedGrade)
  } catch (error) {
    res.status(400).send(error.message);
  }
})

router.get("/learner/:learnerId/class/:classId", async(req, res) => {
  let collection = await db.collection("grades")
  let query = { learner_id: Number(req.params.learnerId), class_id: Number(req.params.classId) }
  let result = await collection.find(query).toArray()

  if (result.length === 0) res.status(404).send("Not found");
  else res.send(result).status(200);

})


// Create a single grade entry
router.post("/", async (req, res) => {
  // let collection = await db.collection("grades");
  let newDocument = req.body;

  // rename fields for backwards compatibility
  if (newDocument.student_id) {
    newDocument.learner_id = newDocument.student_id;
    delete newDocument.student_id;
  }

  // let result = await collection.insertOne(newDocument);
  let result = await Grades.create(newDocument)
  res.send(result).status(204);
});
export default router;