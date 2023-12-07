import express from 'express';
import { mongoDBURL } from './config.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bookrouter from './routes/booksRoute.js';

const app = express();
dotenv.config();
mongoose.set('strictQuery', false);
const PORT = process.env.PORT || 4000;
//const mongoDBURL = process.env.mongoDBURL;

//use cors policy
app.use(cors());

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );
app.use(express.json());
app.use('/books', bookrouter);
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('connected successfully');
    app.listen(PORT, () => {
      console.log(`App is listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
