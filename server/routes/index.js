var express = require('express');
var router = express.Router();
const csv = require('csv-parser')
const fs = require('fs')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/status', function(req, res, next) {
  try {
  return res.send('Up and running');
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

/* GET home page. */
router.get('/stations', function(req, res, next) {
  try {
    let results = [];
    fs.createReadStream('stations/Stations_2019.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
