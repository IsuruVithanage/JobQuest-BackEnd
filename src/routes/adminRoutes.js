const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');


router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.adminLogin);
router.get('/getAllCompany', adminController.getAllCompanies);
router.delete('/deleteCompany/:companyId', adminController.deleteCompany);
router.put('/updateCompany/:companyId', adminController.updateCompany);
router.get('/getAllInstitutes', adminController.getAllInstitutes);
router.delete('/deleteInstitute/:instituteId', adminController.deleteInstitute);
router.put('/updateInstitute/:instituteId', adminController.updateInstitute);

module.exports = router;
