import express from 'express';

const usersRouter = express.Router();

// routes
// /users/:userId - gausim username
usersRouter.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  const sql = 'SELECT name, created_at, email FROM `users` WHERE id = ?';

  res.json('getting username');
});

export default usersRouter;
