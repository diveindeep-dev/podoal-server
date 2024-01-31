import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3001;

const CLIENT_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.PRODUCT_URL;

export { PORT, CLIENT_URL };
