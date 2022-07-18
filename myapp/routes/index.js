const express = require ('express');
const router = express.Router();

/* GET home page. */
router.all('/', function(req, res, next) {
	res.send('APP iniciado');
});

module.exports = router ;
