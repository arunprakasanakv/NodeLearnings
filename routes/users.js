var express = require('express');
var router = express.Router();
const login = require('../controllers/detailController');

router.get('/', login.getDetails);
router.get('/addUser', login.addDetails);
router.get('/editUser', login.editDetails);
router.get('/deleteUser', login.deleteDetails);


module.exports = router;
