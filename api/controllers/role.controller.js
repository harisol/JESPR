const { Role } = require('../database/models');
const { logicError } = require('../etc/error-handler');
const { defaultLimit } = require('../etc/my-config');

/** @type {import("express").RequestHandler} */
exports.listRole = (req, res) => {
    const { limit, page } = req.query;

    Role.findAll({
        limit: limit || defaultLimit,
        offset: page ? (Number(page) - 1) * limit : 0,
    }).then((roles) => {
        res.status(200).json({ roles });
    }).catch((error) => {
        logicError(error, res);
    });
};

/** @type {import("express").RequestHandler} */
exports.createRole = (req, res) => {
    const { rolename } = req.body;

    Role.create({
        rolename,
    }).then((role) => {
        res.status(201).json({ role });
    }).catch((error) => {
        logicError(error, res);
    });
};
