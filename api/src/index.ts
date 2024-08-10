// backend/src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Client } from 'pg';
import playsRouter from './routes/plays';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

app.use(cors());
app.use(express.json());

// Initialize and connect the database client
console.log(process.env.MST_DB_CONNECTION);
const dbClient = new Client({
    connectionString: process.env.MST_DB_CONNECTION || process.env.DATABASE_URL ,
    ssl: {
        rejectUnauthorized: false,
    },
});

dbClient.connect()
    .then(() => console.log('Connected to MTS database'))
    .catch(err => console.error('Database connection error:', err.stack));

// Make dbClient available to other modules
export { dbClient };

app.use('/api', playsRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
