const auth = require('../middleware/auth');
const { hashPassword, comparePassword, generateToken } = require('../middleware/auth');
const { validateUserRegistration, validateUserLogin } = require('../middleware/validation');
const User = require('../models/userModel');

exports.registerUser = async (req, res) => {
    try {
        const { error } = validateUserRegistration(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(400).send('User already registered.');

        const hashedPassword = await hashPassword(req.body.password);

        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
            userType: req.body.userType
        });

        await user.save();

        const token = generateToken(user);

        res.header('x-auth-token', token).send({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            userType: user.userType
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user.');
    }
};

exports.userLogin = async (req, res) => {
    try {
        const { error } = validateUserLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email or password.');

        const validPassword = await comparePassword(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');

        const token = generateToken(user);

        res.header('x-auth-token', token).send({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            userType: user.userType,
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in.');
    }
};