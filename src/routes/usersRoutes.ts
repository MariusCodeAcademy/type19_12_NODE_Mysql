import express from 'express';
import dbQueryWithData from '../helpers/helper.js';
import { UserObjType } from '../helpers/types.js';

const usersRouter = express.Router();

// routes
// /users/:userId - gausim username
usersRouter.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  const sql = 'SELECT name, created_at, email FROM `users` WHERE id = ?';

  const [userArr, msqlErr] = await dbQueryWithData<UserObjType[]>(sql, [userId]);

  if (msqlErr) {
    console.warn('msqlErr ===', msqlErr);
    return res.status(500).json('bad thing happen');
  }

  console.log('userArr ===', userArr);

  // ar radom useri?
  if (userArr.length === 0) {
    return res.status(404).json(`User with id: ${userId} was not found`);
  }

  res.json(userArr[0]);
});

export default usersRouter;
