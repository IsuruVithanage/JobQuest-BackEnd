const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');


router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.adminLogin);

module.exports = router;
