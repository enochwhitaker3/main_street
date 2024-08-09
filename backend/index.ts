import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Client } from 'pg';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dbClient = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

dbClient.connect()
    .then(() => console.log('Connected to MTS database'))
    .catch(err => console.error('Database connection error:', err.stack));


app.get('/test-db', async (req, res) => {
    try {
        const result = await dbClient.query('select * from mts.plays');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
