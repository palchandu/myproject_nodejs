var express = require('express');
var router = express.Router();
var miscController=require('../controller/miscallaneousController');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add_profile',miscController.add_details);
module.exports = router;
