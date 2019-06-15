var express = require('express');
var router = express.Router();
var miscController=require('../controller/miscallaneousController');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add_profile',miscController.add_details);
router.get('/get_profile',miscController.find_details);
router.post('/update_profile',miscController.update_profile);

router.get('/get_files',miscController.getFiles);
router.post('/add_country',miscController.add_country);
router.post('/add_state',miscController.add_states);
router.post('/add_city',miscController.add_city);

module.exports = router;
