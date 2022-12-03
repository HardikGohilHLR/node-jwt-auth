// Controller - Auth / Signup
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const User = require('../../models/user.model');
const { handleError } = require('../../common/functions');

const signup = async (req, res) => {

    const loginSchema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }).options({ abortEarly: false });

    const { error } = loginSchema.validate(req?.body);

    if (error) {
        return res.status(400).json(handleError(error?.details));
    }

    const { username, email, password } = req.body;

    try {
        // Check if user exists
		const user = await User.findOne({email});

        if(user) {
            throw new Error('User Already Exists...');
        }

        // Encrypt Password
        const hashedPassword = await bcrypt.hash(password.toString(), 12);

        // Create JWT Token
        const token = jwt.sign({email}, 'JWT_SECRET', { expiresIn: '2d' });

        const addUser = await User.create({ username, email, password: hashedPassword, token });

        res.status(201).json(addUser);
    }
    catch(err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = signup;
