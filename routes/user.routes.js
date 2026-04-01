const express = require('express');
const auth = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const userValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.use(auth); // Require authentication for all user routes

router
  .route('/')
  .get(authorize('admin'), userController.getUsers);

router
  .route('/:id')
  .patch(authorize('admin'), validate(userValidation.updateUserRole), userController.updateUser);

module.exports = router;
