const { User } = require('../database/models');
const { logicError } = require('../etc/error-handler');
const { defaultLimit } = require('../etc/my-config');

/** @type {import("express").RequestHandler} */
exports.listUser = (req, res) => {
    const limit = req.query.limit || defaultLimit;
    const page = req.query.page;

    User.findAll({
        limit,
        offset: page ? (Number(page) - 1) * limit : 0,
        include: [
            {
                association: 'Role', // pass the model name
                // model: Role // alternatively, pass the Class
                attributes: {
                    exclude: 'created_at',
                },
            },
            // {
            //   model: models.Comment,
            //   as: "comments",
            //   include: [
            //     {
            //       model: models.User,
            //       as: "author"
            //     }
            //   ]
            // },
        ],
    }).then((users) => {
        res.status(200).json({ users });
    }).catch((error) => {
        logicError(error, res);
    });
};

/** @type {import("express").RequestHandler} */
exports.createUser = (req, res) => {
    const { username, role_id } = req.body;

    User.create({
        username,
        role_id,
    }).then(user => {
        res.status(201).json({ user });
    }).catch(error => {
        logicError(error, res);
    });
};
