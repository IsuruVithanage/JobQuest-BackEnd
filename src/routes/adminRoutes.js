// AdminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.get('/users/all', auth.authenticate, adminController.viewAllUsers);
router.delete('/users/:userId', auth.authenticate, adminController.deleteUserById);
router.get('/companies/all', auth.authenticate, adminController.viewAllCompanies);
router.delete('/companies/:companyId', auth.authenticate, adminController.deleteCompanyById);
router.get('/institutes/all', auth.authenticate, adminController.viewAllInstitutes);
router.delete('/institutes/:instituteId', auth.authenticate, adminController.deleteInstituteById);

// Routes for managing consultants
router.post('/consultants/register', adminController.registerConsultant);
router.delete('/consultants/:consultantId', auth.authenticate, adminController.deleteConsultantById);
router.get('/consultants/all', auth.authenticate, adminController.viewAllConsultants);

router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.adminLogin);

module.exports = router;
