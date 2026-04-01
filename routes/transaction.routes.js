const express = require('express');
const auth = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const transactionValidation = require('../validations/transaction.validation');
const transactionController = require('../controllers/transaction.controller');

const router = express.Router();

router.use(auth); // Authentication required for all routes

router
  .route('/')
  .post(
    authorize('admin'),
    validate(transactionValidation.createTransaction),
    transactionController.createTransaction
  )
  .get(
    authorize('analyst', 'admin'),
    validate(transactionValidation.getTransactions),
    transactionController.getTransactions
  );

router
  .route('/:id')
  .get(
    authorize('analyst', 'admin'),
    validate(transactionValidation.getTransaction),
    transactionController.getTransaction
  )
  .patch(
    authorize('admin'),
    validate(transactionValidation.updateTransaction),
    transactionController.updateTransaction
  )
  .delete(
    authorize('admin'),
    validate(transactionValidation.deleteTransaction),
    transactionController.deleteTransaction
  );

module.exports = router;
