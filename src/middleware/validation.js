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