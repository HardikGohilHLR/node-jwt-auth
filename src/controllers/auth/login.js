// Controller - Auth / Login
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const User = require('../../models/user.model');
const { handleError } = require('../../common/functions');

const login = async (req, res) => {

    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }).options({ abortEarly: false });

    const { error } = loginSchema.validate(req?.body);

    if (error) {
        return res.status(400).json(handleError(error?.details));
    }

    const { email, password } = req.body;

    try {
        // Check if user exists
		const user = await User.findOne({email});

        if(!user) {
            throw new Error('No User found...');
        }

        // Check Password
        const passwordMatch = await bcrypt.compare(password, user?.password);

        if(!passwordMatch) {
            throw new Error('Invalid credentials...');
        }

        // Create JWT Token
        const token = jwt.sign({id: user._id}, 'JWT_SECRET', { expiresIn: '2d' });

        const addUser = await User.findByIdAndUpdate(user._id, { token }, { new: true }); 

        res.status(201).json(addUser);
    }
    catch(err) {
        res.status(400).json({message: err.message});
    }
}

module.exports = login;
