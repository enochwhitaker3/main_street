// backend/src/controllers/playsController.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import { dbClient } from '..';
import { PlayType } from '../../../shared/types/plays';

const app = express()
app.use(cors());

export const getAllPlays = async (req: Request, res: Response) => {
  try {
    const result = await dbClient.query('SELECT * FROM mts.plays');
    const plays: PlayType[] = result.rows.map(row => ({
      id: row.id,
      sponsor_id: row.sponsor_id,
      title: row.title,
      start_date: new Date(row.start_date),
      end_date: new Date(row.end_date),
      poster: row.poster, // Adjust this if `poster` is not already in Uint8Array format
      director: row.director,
    }));
    res.json(plays);
  } catch (error) {
    console.error('Error fetching plays:', error);
    res.status(500).json({ error: 'Failed to fetch plays' });
  }
};