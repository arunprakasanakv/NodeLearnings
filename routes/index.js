var express = require('express');
var router = express.Router();
const login = require('../controllers/loginController');
/* GET home page. */
router.get('/', login.getLogin);

router.get('/login', login.getLogin);

module.exports = router;
