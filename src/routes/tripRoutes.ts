// sukurti ir exportuoti routeri
import express from 'express';
import dbQueryWithData from '../helpers/helper.js';
import { TripObjType } from '../helpers/types.js';

const tripsRouter = express.Router();

// const fields = [
//   'id','name','date','country','city','rating','description','price','user_id',
// ];
// id,name,date,country,city,rating,description,price,user_id

// GET - /trips/ - texta 'get all trips'
tripsRouter.get('/', async (_req, res) => {
  // panaudoti dbQueryWithData
  const sql =
    'SELECT id,name,date,country,city,rating,description,price,user_id FROM trips WHERE is_deleted=0';
  const [row, error] = (await dbQueryWithData(sql)) as [TripObjType[], Error];

  if (error) {
    console.warn('error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  console.log('row ===', row[0]);

  // gauti visus trips objektus masyvo pavidalu
  res.json(row);
});

export default tripsRouter;
