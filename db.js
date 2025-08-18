
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test'); 
    console.log('MongoDB bağlantısı başarılı');
  } catch (error) {
    console.error('Bağlantı hatası:', error.message);
    process.exit(1);
  }
};

export default connectDB;
