const { body } = require('express-validator');
const validationReview = require('./validation-review');

exports.validateLogin = () => [
    body('username')
        .notEmpty()
        .withMessage('username is required')
        .bail() // continue only when previous check is valid
        .isString()
        .withMessage('username must be a string'),
    validationReview
];