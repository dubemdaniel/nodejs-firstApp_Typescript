import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in .env file');
    }
    await mongoose.connect(mongoURI, {});
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};


connectDB();

export default mongoose;