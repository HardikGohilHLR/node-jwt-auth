// Middleware Auth
const jwt = require('jsonwebtoken');

const verifyAuthToken = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split('Bearer ')[1];

        if (!token) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decodedToken.id;
        next();
    }
    catch (error) {
        return res.status(401).json({ error });
    }
};
 
module.exports = verifyAuthToken;
  