import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.warn('⚠️  No MONGODB_URI configured. Running without database.');
    console.warn('   Contact form submissions will not be saved.');
    console.warn('   Set MONGODB_URI in .env to enable database features.');
    return;
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    console.warn('⚠️  Server will continue running without database.');
  }
};

export default connectDB;
