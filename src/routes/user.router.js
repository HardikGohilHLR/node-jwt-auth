// Route - User
const { Router } = require('express');

const UserController = require('../controllers/user');
const Auth = require('../middlewares');

const UserRouter = Router();

UserRouter.get('/get-user', [Auth.verifyAuthToken], UserController.getUser);

module.exports = UserRouter;
