// sukurti ir exportuoti routeri
import express from 'express';
import dbQueryWithData from '../helpers/helper.js';
import { TripObjType } from '../helpers/types.js';
import { ResultSetHeader } from 'mysql2';
import { checkTripBody } from '../middleware/middleware.js';

const tripsRouter = express.Router();

// const fields = [
//   'id','name','date','country','city','rating','description','price','user_id',
// ];
const tripCols =
  'id,name,date,country,city,rating,description,price,user_id,image_main,images_1,images_2,images_3';

// GET - /trips/ - texta 'get all trips'
tripsRouter.get('/', async (_req, res) => {
  // panaudoti dbQueryWithData
  const sql = `
  SELECT trips.id,trips.name,trips.date,trips.country,trips.city,trips.rating,trips.description,trips.price,trips.user_id,trips.image_main,trips.images_1,trips.images_2,trips.images_3, users.email, COUNT(likes.id) as likes
  FROM trips
  LEFT JOIN users
  ON trips.user_id = users.id
  LEFT JOIN likes
  ON trips.id = likes.trip_id
  WHERE trips.is_deleted = 0
  GROUP BY trips.id
  `;
  const [row, error] = await dbQueryWithData<TripObjType[]>(sql);

  if (error) {
    console.warn('get all trips error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  console.log('row ===', row[0]);

  // gauti visus trips objektus masyvo pavidalu
  res.json(row);
});

// BAck end route
// GET - /trips/country/france - grazinti visas keliones is france

// GET - /trips/deleted - texta 'get all trips archive'
tripsRouter.get('/deleted', async (_req, res) => {
  // panaudoti dbQueryWithData
  const sql = `
  SELECT trips.id,trips.name,trips.date,trips.country,trips.city,trips.rating,trips.description,trips.price,trips.user_id,trips.image_main,trips.images_1,trips.images_2,trips.images_3, users.email
  FROM trips
  LEFT JOIN users
  ON trips.user_id = users.id
  WHERE trips.is_deleted = 1
  `;
  const [row, error] = await dbQueryWithData<TripObjType[]>(sql);

  if (error) {
    console.warn('get all trips error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  console.log('row ===', row[0]);

  // gauti visus trips objektus masyvo pavidalu
  res.json(row);
});

// Get - trips/cities - grazinti visus unikalius miestus
tripsRouter.get('/cities', async (_req, res) => {
  const sql = `SELECT DISTINCT city FROM trips WHERE is_deleted=0`;
  const [row, error] = await dbQueryWithData<TripObjType[]>(sql);

  if (error) {
    console.warn('get all cities error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  // gauti visus trips objektus masyvo pavidalu
  res.json(row);
});

// GET /trips/countries - grazinti visas unikalias salis
tripsRouter.get('/countries', async (_req, res) => {
  const sql = `SELECT DISTINCT country FROM trips WHERE is_deleted=0`;
  const [row, error] = (await dbQueryWithData(sql)) as [TripObjType[], null] | [null, Error];

  if (error) {
    console.warn('get all countries error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  // gauti visus trips objektus masyvo pavidalu
  res.json(row);
});

// GET /trips/filter?country=uk
tripsRouter.get('/filter', async (req, res) => {
  // kur gyvena ?country
  const countryVal = req.query.country?.toString();
  const cityVal = req.query.city?.toString();
  const rating = req.query.rating?.toString();

  // if (!countryVal && !cityVal && !rating) return res.status(400).json('no country/city given');

  // kreiptis i duomenu base ir pariusti tik tos salies objektus
  let sql = `
  SELECT trips.id,trips.name,trips.date,trips.country,trips.city,trips.rating,trips.description,trips.price,trips.user_id,trips.image_main,trips.images_1,trips.images_2,trips.images_3, users.email
  FROM trips
  LEFT JOIN users
  ON trips.user_id = users.id
  WHERE trips.is_deleted = 0`;
  // let sql = `SELECT ${tripCols} FROM trips WHERE is_deleted=0`;
  let argArr = [];

  if (countryVal) {
    sql += ` AND country = ?`;
    argArr.push(countryVal);
  }

  if (cityVal) {
    sql += ` AND city = ?`;
    argArr.push(cityVal);
  }

  if (rating) {
    sql += ` AND rating >= ?`;
    argArr.push(rating);
  }

  // prideti rating

  // const sql = `SELECT ${tripCols} FROM trips WHERE is_deleted=0 AND country = ? AND city = ?`;
  // const sql = `SELECT ${tripCols} FROM trips WHERE is_deleted=0 AND country = ? AND city = ? AND raing ? ?`;
  const [row, error] = await dbQueryWithData<TripObjType[]>(sql, argArr);

  if (error) {
    console.warn('get all trips error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  // console.log('row ===', row[0]);

  // gauti visus trips objektus masyvo pavidalu
  res.json(row);

  // res.json(countryVal);
});

// GET /trips/user/id/1
tripsRouter.get('/user/id/:userId', async (req, res) => {
  const userId = req.params.userId;
  const sql = `SELECT ${tripCols} FROM trips WHERE is_deleted=0 AND user_id=?`;

  const [rows, error] = await dbQueryWithData<TripObjType[]>(sql, [userId]);

  if (error) {
    console.warn('get all trips error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  // console.log('row ===', row[0]);

  // gauti visus trips objektus masyvo pavidalu
  res.json(rows);
});

// - GET /trips/:id - grazinti viena irasa pagal id
tripsRouter.get('/:tripId', async (req, res) => {
  const currentId = req.params.tripId;

  // const sql = `SELECT ${tripCols} FROM trips WHERE is_deleted=0 AND id=?`;
  let sql = `
  SELECT trips.id,trips.name,trips.date,trips.country,trips.city,trips.rating,trips.description,trips.price,trips.user_id,trips.image_main,trips.images_1,trips.images_2,trips.images_3, users.email, COUNT(likes.id) as likes
  FROM trips
  LEFT JOIN users
  ON trips.user_id = users.id
  LEFT JOIN likes
  ON trips.id = likes.trip_id
  WHERE trips.is_deleted = 0 AND trips.id=?
  GROUP BY trips.id`;

  const [rows, error] = await dbQueryWithData<TripObjType[]>(sql, [currentId]);

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

// GET /trips/byCountry/1 - grazina visa keliones is salies kurios id 1
tripsRouter.get('/byCountry/:countryId', async (req, res) => {
  const countryId = req.params.countryId;
  const sql = `
  SELECT trips.id,trips.name,trips.date,trips.country,trips.city,trips.rating,trips.description,trips.price,trips.user_id,trips.image_main,trips.images_1,trips.images_2,trips.images_3
  FROM trips
  RIGHT JOIN countries
  ON trips.country = countries.name
  WHERE countries.id = ? AND trips.is_deleted = 0
  `;

  const [rows, error] = await dbQueryWithData<TripObjType[]>(sql, [countryId]);

  if (error) {
    console.warn('byCountry trips error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  res.json(rows);
});

// - POST /trips - sukurti nauja irasa
tripsRouter.post('/', checkTripBody, async (req, res) => {
  // tai kas atsiusta gyvena ?

  const {
    name,
    date,
    country,
    city,
    rating,
    description,
    price,
    user_id,
    image_main,
    images_1 = '',
    images_2 = '',
    images_3 = '',
  } = req.body as Omit<TripObjType, 'id'>;
  // validation
  const argArr = [
    name,
    date,
    country,
    city,
    rating,
    description,
    price,
    user_id,
    image_main,
    images_1,
    images_2,
    images_3,
  ];

  // panaudoti dbQueryWithData ir sukurti nauja irasa
  const sql = `INSERT INTO trips (name, date, country, city, rating, description, price, user_id, image_main, images_1, images_2, images_3) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;

  // jei sekmingai sukurta grzinti naujai sukurto iraso id
  const [rows, error] = await dbQueryWithData<ResultSetHeader>(sql, argArr);

  // grazinti pilna nauja objekta
  if (error) {
    console.warn('sukurti nauja irasa error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  // // sukurimo rezultato tipas yra ResultSetHeader
  // let rez: ResultSetHeader;
  // res.json(rows);
  res.json({ id: rows.insertId, ...req.body } as TripObjType);
});

// - DELETE /trips/:id - istrinti irasa pakeiciant is_deleted i 1

tripsRouter.delete('/:tripId', async (req, res) => {
  const currentTripId = req.params.tripId;
  console.log('req.body ===', req.body);
  const currentBody = req.body as { userId: number };

  console.log('currentId ===', currentTripId);

  // gauti ir palyginti tripUserId
  const sql1 = 'SELECT * FROM trips WHERE id=?';
  const [tripsArr, myError] = await dbQueryWithData<TripObjType[]>(sql1, [currentTripId]);

  if (myError) {
    console.log('myError ===', myError);
    return res.status(500).json('bad bad things');
  }
  console.log('tripsArr ===', tripsArr);
  const tripUserId = tripsArr[0].user_id;
  // return res.status(400).json(tripsArr);

  // jei useris ne saviningkas pranesti su 403
  console.log('req.body.userId.toString() ===', req.body.userId.toString());
  console.log('tripUserId ===', tripUserId);
  if (currentBody.userId !== tripUserId) {
    return res.status(401).json({ error: 'only owner can delete' });
  }

  const sql = `UPDATE trips SET is_deleted=1 WHERE id=? LIMIT 1`;

  const [rows, error] = await dbQueryWithData<ResultSetHeader>(sql, [currentTripId]);

  if (error) {
    console.warn('istrinti irasa pakeiciant is_deleted i 1 error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  if (rows.affectedRows === 0) {
    console.log('no rows');
    return res.status(404).json({ error: `trip with id: '${currentTripId}' was not found` });
  }

  res.json({ msg: `trip with id: '${currentTripId}' was deleted` });
});

export default tripsRouter;
