const { body } = require('express-validator');
const { adminOnly } = require('../etc/middleware');
const validationReview = require('./validation-review');

exports.validateCreateOutlet = () => [
    adminOnly,
    body('name')
        .notEmpty()
        .withMessage('name is required')
        .bail() // continue only when previous check is valid
        .isString()
        .withMessage('name must be a string'),
    validationReview
];
 