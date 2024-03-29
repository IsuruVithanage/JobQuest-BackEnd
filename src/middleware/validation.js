const Joi = require('joi');

exports.validateAdminRegistration = (data) => {
    const schema = Joi.object({
        adminName: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(30).required(),
        userType: Joi.string().valid('user', 'company', 'institute', 'admin')
    });
    return schema.validate(data);
};

exports.validateUserRegistration = (data) => {
    const schema = Joi.object({
        userName: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(30).required(),
        userType: Joi.string().valid('user', 'company', 'institute', 'admin')
    });
    return schema.validate(data);
};

exports.validateAdminLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(30).required(),
    });
    return schema.validate(data);
};


exports.validateInstituteRegistration = (data) => {
    const schema = Joi.object({
        instituteName: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        websiteUrl: Joi.string().uri().required(),
        instituteType: Joi.string().valid('public', 'private').required()
    });
    return schema.validate(data);
};

exports.validateJob = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(255).required(),
        description: Joi.string().min(10).required(),
        location: Joi.string().min(3).max(255).required(),
        industry: Joi.string().min(3).max(255).required(),
    });
    return schema.validate(data);
};

exports.validateCompanyRegistration = (data) => {
    const schema = Joi.object({
        companyName: Joi.string().min(3).max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(), // Adjust minimum password length as needed
        companyType: Joi.string().min(3).max(255).required(),
    });
    return schema.validate(data);
};

exports.validateCourse = (data) => {
    const schema = Joi.object({
        institute: Joi.string().required(), // Assuming institute ID is provided
        title: Joi.string().required(),
        description: Joi.string().required(),
        syllabus: Joi.string().required(),
        enrollmentCriteria: Joi.string().required(),
        content: Joi.array().items(Joi.object({
            topic: Joi.string().required(),
            url: Joi.string().uri().required()
        })).required()
    });
    return schema.validate(data);
};