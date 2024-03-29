const auth = require('../middleware/auth');
const { hashPassword, comparePassword, generateToken } = require('../middleware/auth');
const { validateInstituteLogin, validateCourse, validateInstituteRegistration} = require('../middleware/validation');
const Course = require('../models/courseModel');
const Institute = require("../models/instituteModel");


exports.registerInstitute = async (req, res) => {
    try {
        const { error } = validateInstituteRegistration(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const existingInstitute = await Institute.findOne({ email: req.body.email });
        if (existingInstitute) return res.status(400).send('Institute already registered.');

        const hashedPassword = await hashPassword(req.body.password);

        const institute = new Institute({
            instituteName: req.body.instituteName,
            email: req.body.email,
            password: hashedPassword,
            description: req.body.description,
            location: req.body.location,
            websiteUrl: req.body.websiteUrl,
            instituteType: req.body.instituteType
        });

        await institute.save();

        const token = generateToken(institute);

        res.header('x-auth-token', token).send({
            instituteName: req.body.instituteName,
            email: req.body.email,
            description: req.body.description,
            location: req.body.location,
            websiteUrl: req.body.websiteUrl,
            instituteType: req.body.instituteType
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering institute.');
    }
};

exports.instituteLogin = async (req, res) => {
    try {
        const { error } = validateInstituteLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const institute = await Institute.findOne({ email: req.body.email });
        if (!institute) return res.status(400).send('Invalid email or password.');

        const validPassword = await comparePassword(req.body.password, institute.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');

        const token = generateToken(institute);

        res.header('x-auth-token', token).send({
            _id: institute._id,
            instituteName: institute.instituteName,
            email: institute.email,
            instituteType: institute.instituteType,
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in.');
    }
};

exports.addCourse = async (req, res) => {
    try {
        const { error } = validateCourse(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const course = new Course({
            institute: req.body.institute,
            title: req.body.title,
            description: req.body.description,
            syllabus: req.body.syllabus,
            enrollmentCriteria: req.body.enrollmentCriteria,
            content: req.body.content
        });

        await course.save();

        res.status(201).send(course);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Error adding course.');
    }
};

exports.getAllCoursesByInstitute = async (req, res) => {
    try {
        const instituteId = req.params.instituteId;

        const courses = await Course.find({ institute: instituteId });

        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching courses');
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        await Course.findByIdAndDelete(courseId);

        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting course" });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const updateFields = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const updatedCourse = await Course.findByIdAndUpdate(courseId, updateFields, { new: true });

        res.json(updatedCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating course" });
    }
};