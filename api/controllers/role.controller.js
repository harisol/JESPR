const { Role } = require('../database/models');
const { defaultLimit } = require('../etc/my-config');

/** @type {import("express").RequestHandler} */
exports.listRole = (req, res, next) => {
    const { limit, page } = req.query;

    Role.findAll({
        limit: limit || defaultLimit,
        offset: page ? (Number(page) - 1) * limit : 0,
    }).then((roles) => {
        res.status(200).json({ roles });
    }).catch((error) => {
        next(error);
    });
};

/** @type {import("express").RequestHandler} */
exports.createRole = (req, res, next) => {
    const { rolename } = req.body;

    Role.create({
        rolename,
    }).then((role) => {
        res.status(201).json({ role });
    }).catch((error) => {
        next(error);
    });
};
