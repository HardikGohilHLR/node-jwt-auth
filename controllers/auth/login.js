// Controller - Auth / Login
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const login = async (req, res) => {

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
        const token = jwt.sign({email}, 'JWT_SECRET', { expiresIn: '2d' });

        const addUser = await User.findByIdAndUpdate(user._id, { token }, { new: true }); 

        res.status(201).json(addUser);
    }
    catch(err) {
        res.status(400).json({message: err.message});
    }
}

module.exports = login;
