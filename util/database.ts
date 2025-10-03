import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://princedaniel7890:dubemshop@cluster0.x5qlnja.mongodb.net/', {
     
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Connect immediately when module is imported
connectDB();

export default mongoose;
