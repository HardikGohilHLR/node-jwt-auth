// Route - Auth
const { Router } = require('express');

const AuthController = require('../controllers/auth');

const AuthRouter = Router();

AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/signup', AuthController.signup);

module.exports = AuthRouter;
