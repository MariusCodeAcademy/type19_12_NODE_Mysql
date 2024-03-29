import express from 'express';
import { LikeObj } from '../helpers/types.js';
import dbQueryWithData from '../helpers/helper.js';
import { ResultSetHeader } from 'mysql2';

const likesRouter = express.Router();

// Routes
// POST - /likes - sukurs nauja irasa likes lenteleje
likesRouter.post('/', async (req, res) => {
  console.log('req.body ===', req.body);
  const { trip_id, user_id } = req.body as Omit<LikeObj, 'id' | 'created_at'>;

  const sql = 'INSERT INTO likes ( trip_id, user_id ) VALUES ( ?, ? )';

  const [rezult, err] = await dbQueryWithData<ResultSetHeader>(sql, [trip_id, user_id]);

  if (err) {
    console.warn('sukurs nauja irasa likes lenteleje ===', err);
    console.warn('error ===', err.message);
    return res.status(500).json({ error: 'something went wrong' });
  }

  if (rezult.insertId) {
    return res.status(201).json('liked');
  }

  return res.status(500).json({ error: 'no id created' });
});

// GET - /likes/:tripId grazina visus tos keliones likes

export default likesRouter;
