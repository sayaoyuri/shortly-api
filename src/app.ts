import express, { Express, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { handleApplicationError } from '@/middlewares';
import { connectDb, disconnectDB } from '@/config';

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req: Request, res: Response) => res.send(`I'm up and running!`))
  .use(handleApplicationError);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
