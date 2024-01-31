import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3001;

const CLIENT_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.PRODUCT_URL;

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/db';

export { PORT, CLIENT_URL, DB_URL };
