const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const auth = require('../middleware/auth');


router.post('/register', companyController.registerCompany);
router.post('/login', companyController.companyLogin);
router.post('/addJob', companyController.addJob);
router.get('/getAllJobs/:companyId', companyController.getAllJobsByCompany);

module.exports = router;
