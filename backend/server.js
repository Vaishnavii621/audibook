import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import morgan from 'morgan';
import winston from 'winston';
import path from 'path';

// Configure Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Load environment variables from .env file
dotenv.config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.use(express.json());

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serve static files from the "public" directory
const __dirname = path.resolve();
app.use('/images', express.static(path.join(__dirname, '/images')));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB and start the server
const connectDBAndStartServer = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000,
    });
    logger.info('MongoDB connected successfully');
    // Start the server after successful MongoDB connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Connect to the database and start the server
connectDBAndStartServer();


//mongodb+srv://ndpvaishnavi:pYFfFJEhREKhwenc@audiobook.5tfbwtj.mongodb.net/audio_book?retryWrites=true&w=majority&appName=audiobook
//mongodb+srv://ndpvaishnavi:pYFfFJEhREKhwenc@audiobook.5tfbwtj.mongodb.net/audio_book?retryWrites=true&w=majority&appName=audiobook