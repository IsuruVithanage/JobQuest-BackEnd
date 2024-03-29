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

exports.validateAdminLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(30).required(),
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