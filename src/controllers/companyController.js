const auth = require('../middleware/auth');
const { hashPassword, comparePassword, generateToken } = require('../middleware/auth');
const { validateCompanyRegistration, validateCompanyLogin, validateJob } = require('../middleware/validation');
const Company = require('../models/companyModel');
const Job = require('../models/jobModel');


exports.registerCompany = async (req, res) => {
    try {
        const { error } = validateCompanyRegistration(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const existingCompany = await Company.findOne({ email: req.body.email });
        if (existingCompany) return res.status(400).send('Company already registered.');

        const hashedPassword = await hashPassword(req.body.password);

        const company = new Company({
            companyName: req.body.companyName,
            email: req.body.email,
            password: hashedPassword,
            description: req.body.description,
            location: req.body.location,
            industry: req.body.industry,
            companyType: req.body.companyType
        });

        await company.save();

        const token = generateToken(company);

        res.header('x-auth-token', token).send({
            companyName: req.body.companyName,
            email: req.body.email,
            description: req.body.description,
            location: req.body.location,
            industry: req.body.industry,
            companyType: req.body.companyType
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering company.');
    }
};

exports.companyLogin = async (req, res) => {
    try {
        const { error } = validateCompanyLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const company = await Company.findOne({ email: req.body.email });
        if (!company) return res.status(400).send('Invalid email or password.');

        const validPassword = await comparePassword(req.body.password, company.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');

        const token = generateToken(company);

        res.header('x-auth-token', token).send({
            _id: company._id,
            companyName: company.companyName,
            email: company.email,
            companyType: company.companyType,
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in.');
    }
};

exports.addJob = async (req, res) => {
    try {
        const { error } = validateJob(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const job = new Job({
            company: '6606bcfee177b7aeccca29bf',
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            industry: req.body.industry
        });

        await job.save();

        res.status(201).send(job);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding job.');
    }
};

exports.getAllJobsByCompany = async (req, res) => {
    try {
        const companyId = req.params.companyId;

        const jobs = await Job.find({ company: companyId });

        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching jobs');
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        await Job.findByIdAndDelete(jobId);

        res.json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting job" });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const updateFields = req.body;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const updatedJob = await Job.findByIdAndUpdate(jobId, updateFields, { new: true });

        res.json(updatedJob);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating job" });
    }
};