const express = require('express');
const router = express.Router();
const instituteController = require('../controllers/instituteController');
const auth = require('../middleware/auth');


router.post('/register', instituteController.registerInstitute);
router.post('/login', instituteController.instituteLogin);
router.post('/addCourse', instituteController.addCourse);
router.get('/getAllCourses/:instituteId', instituteController.getAllCoursesByInstitute);
router.delete('/deleteCourse/:courseId', instituteController.deleteCourse);
router.put('/updateCourse/:courseId', instituteController.updateCourse);

module.exports = router;
