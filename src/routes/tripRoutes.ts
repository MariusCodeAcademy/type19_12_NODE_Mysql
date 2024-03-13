// sukurti ir exportuoti routeri
import express from 'express';

const tripsRouter = express.Router();

// GET - /trips/ - texta 'get all trips'
tripsRouter.get('/', async (_req, res) => {
  res.json('getting all trips');
});

export default tripsRouter;
