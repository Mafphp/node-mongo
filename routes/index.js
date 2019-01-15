const express = require('express');
const router = express.Router();
const env = require('../env');

// Test request identifier
router.use((req, res, next) => {
  req.test = req.app.get('env') === 'test' ? req.query.test === 'tEsT' : false;
  next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;