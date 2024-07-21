import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'

 dotenv.config()

 const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI,{
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
 
const importData = async () => {
  try {
    await connectDB(); // Ensure connection
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    await Product.insertMany(products);
    console.log(products)
    console.log(users)
    console.log('Data Imported!');
    await mongoose.connection.close(); // Close the connection
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    await mongoose.connection.close(); // Close the connection in case of error
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB(); // Ensure connection
    // Remove these lines if not using Order
    // await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    await mongoose.connection.close(); // Close the connection
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    await mongoose.connection.close(); // Close the connection in case of error
    process.exit(1);
  }
};
 if (process.argv[2] === '-d') {
   destroyData()
 } else {
   importData()
 }

