const auth = require('../middleware/auth');
const { hashPassword, comparePassword, generateToken } = require('../middleware/auth');
const { validateAdminRegistration, validateAdminLogin } = require('../middleware/validation');
const Admin = require('../models/adminModel');

exports.registerAdmin = async (req, res) => {
    try {
        const { error } = validateAdminRegistration(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const existingAdmin = await Admin.findOne({ email: req.body.email });
        if (existingAdmin) return res.status(400).send('Admin already registered.');

        const hashedPassword = await hashPassword(req.body.password);

        const admin = new Admin({
            adminName: req.body.adminName,
            email: req.body.email,
            password: hashedPassword,
            userType: req.body.userType
        });

        await admin.save();

        const token = generateToken(admin);

        res.header('x-auth-token', token).send({
            _id: admin._id,
            adminName: admin.adminName,
            email: admin.email,
            userType: admin.userType
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering admin.');
    }
};

exports.adminLogin = async (req, res) => {
    try {
        const { error } = validateAdminLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) return res.status(400).send('Invalid email or password.');

        const validPassword = await comparePassword(req.body.password, admin.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');

        const token = generateToken(admin);

        res.header('x-auth-token', token).send({
            _id: admin._id,
            adminName: admin.adminName,
            email: admin.email,
            userType: admin.userType,
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in.');
    }
};