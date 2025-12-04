import joi from "joi";

// Registration Schema
const registerSchema = joi.object({
    name: joi.string().trim().min(2).max(20).required(),
    username: joi.string().trim().alphanum().min(3).max(10).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    phone: joi.string().pattern(/^[0-9]{10}$/).allow(null, ''),
    profileImage: joi.string().uri().allow(null, ''),
    captcha: joi.string().required(),
    captchaToken: joi.string().required()
});

// Login Schema
const loginSchema = joi.object({
    identifier: joi.string().required(), // can be email or username
    password: joi.string().required(),
    captcha: joi.string().required(),
    captchaToken: joi.string().required()
})

export { registerSchema, loginSchema };