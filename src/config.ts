import { config } from 'dotenv';

config();

export const SECRET_KEY = process.env.SECRET_KEY;
export const DB_URL = process.env.DB_URL;