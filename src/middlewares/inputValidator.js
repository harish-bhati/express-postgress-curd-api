import joi from 'joi';

// User input validation schema 
const userSchema = joi.object({ 
    name: joi.string().min(3).max(100).required(),
    email: joi.string().email().max(100).required(),
    age: joi.number().integer().min(0).required()
}); 
// Middleware for validating user input
const validateUserInput = (req, res, next) => { 
    const { error } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ status: 400, message: error.details[0].message });
    }

    next();
};

export default validateUserInput;