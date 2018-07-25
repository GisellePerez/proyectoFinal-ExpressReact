var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/items', indexController.search );
router.get('/items/:id',indexController.item);



module.exports = router;
