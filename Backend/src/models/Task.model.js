import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  name: {
    type: String,
    required: true,
    trim: true
  },
  // unique among user's tasks optionally
  stage: {
    type: Number,
    required: true,
    enum: [0, 1, 2, 3],
    default: 0
  },
  // 0: Backlog,1:ToDo,2: Ongoing,3: Done
  priority: {
    type: String,
    required: true,
    enum: ["low", "medium", "high"],
    default: "low"
  },

  deadline: {
    type: Date,
    required: false
  }
}, { timestamps: true });

// Compound index to prevent duplicate task names per user
taskSchema.index({ user: 1, name: 1 }, { unique: true });

export default mongoose.model("Task", taskSchema);
