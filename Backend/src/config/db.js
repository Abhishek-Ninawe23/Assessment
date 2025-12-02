import mongoose from "mongoose";

const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connect error:', err.message);
    process.exit(1); // exit to avoid app running without DB
  }
};

export { connectDB };