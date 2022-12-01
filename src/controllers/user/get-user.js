// Controller - User
const User = require("../../models/user.model");

const getUser = async (req, res) => {

    const user = await User.findById(req.userId);

    if(!user) {
        res.status(400).json({ error: true, message: 'No user found!' });
    }

    res.status(200).json(user);
}

module.exports = getUser;
