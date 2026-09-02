import mongoose from 'mongoose';
import { loadEnv } from './env.js';

loadEnv();

const buildMongoUri = () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined in the environment variables.');
  }

  const url = new URL(mongoUri);
  url.searchParams.set('retryWrites', 'false');

  return url.toString();
};

export const connectDatabase = async () => {
  const mongoUri = buildMongoUri();
  await mongoose.connect(mongoUri);
  console.log('mongodb has been connected');
};