import express from 'express';
const router = express.Router();

/* GET home page. */
router.all('/', function(req, res, next) {
  res.send('APP iniciado');
});

export default router;
