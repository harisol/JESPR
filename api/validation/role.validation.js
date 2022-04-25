const { body } = require('express-validator');
const { adminOnly } = require('../etc/middleware');
const validationReview = require('./validation-review');

exports.validateCreateRole = () => [
    adminOnly,
    body('rolename')
        .notEmpty()
        .withMessage('rolename is required')
        .bail() // continue only when previous check is valid
        .isString()
        .withMessage('rolename must be a string'),
    validationReview
];
 