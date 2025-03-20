import mongoose from "mongoose";

// const score = new mongoose.Schema({
//   type: String, 
//   score: Number
// })
const gradeSchema = new mongoose.Schema({

    learner_id: {
      type: Number,
      required: true
    },

    class_id:{
      type: Number, 
      required: true
    },

    scores: {
      // required: true,
      default: []
    }
});


export default mongoose.model("Grades", gradeSchema);