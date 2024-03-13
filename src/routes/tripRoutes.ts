// sukurti ir exportuoti routeri
import express from 'express';
import dbQueryWithData from '../helpers/helper.js';
import { TripObjType } from '../helpers/types.js';

const tripsRouter = express.Router();

// const fields = [
//   'id','name','date','country','city','rating','description','price','user_id',
// ];
const tripCols = 'id,name,date,country,city,rating,description,price,user_id';

// GET - /trips/ - texta 'get all trips'
tripsRouter.get('/', async (_req, res) => {
  // panaudoti dbQueryWithData
  const sql = `SELECT ${tripCols} FROM trips WHERE is_deleted=0`;
  const [row, error] = (await dbQueryWithData(sql)) as [TripObjType[], Error];

  if (error) {
    console.warn('get all trips error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  console.log('row ===', row[0]);

  // gauti visus trips objektus masyvo pavidalu
  res.json(row);
});

// - GET /trips/:id - grazinti viena irasa pagal id
tripsRouter.get('/:tripId', async (req, res) => {
  const currentId = req.params.tripId;

  const sql = `SELECT ${tripCols} FROM trips WHERE is_deleted=0 AND id=?`;

  const [rows, error] = (await dbQueryWithData(sql, [currentId])) as [TripObjType[], Error];

  if (error) {
    console.warn('grazinti viena irasa pagal id error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  // nuspresti ar radom irasa ar 404

  if (rows.length === 0) {
    console.log('no rows');
    return res.status(404).json({ msg: `trip with id: '${currentId}' was not found` });
  }

  // console.log('rows ===', rows);

  res.json(rows[0]);
});

// - POST /trips - sukurti nauja irasa
tripsRouter.post('/', async (req, res) => {
  // tai kas atsiusta gyvena ?

  const atsiusta = req.body;
  console.log('atsiusta ===', atsiusta);

  res.json('creating post');
});

export default tripsRouter;
