import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  phone: {
    type: String,
    default: null
  },  // optional contact

  profileImage: {
    type: String,
    default: null
  }  // store URL/path
}, { timestamps: true });

export default mongoose.model("User",
  userSchema);
