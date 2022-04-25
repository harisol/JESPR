const { User } = require("../database/models");
const { verifyJWT } = require("./my-jwt");

// routes which don't need this middleware
const freeRoutes = [
    '/',
    '/login',
];

/**
 * json webtoken middleware
 * @type {import("express").RequestHandler}
 */
exports.checkToken = (req, res, next) => {
    const path = req.path;
    const registeredPath = req.app.get('registeredPath');
    
    if (freeRoutes.includes(path) || !registeredPath.includes(path)) {
        // skip middleware on freeRoutes or invalid routes
        return next();
    }

    verifyJWT(req.headers['x-access-token']).then(async decoded => {
        // check user with retrieved data
        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw({ message: 'invalid token' });
        }

        // set user data in req property
        req.authedUser = {
            id: decoded.id,
            username: decoded.username,
            rolename: decoded.rolename
        };

        next();
    }).catch(err => {
        res.status(401).json({
            auth: false,
            message: err.message || err,
        });
    });
};

/**
 * admin only middleware
 * @type {import("express").RequestHandler}
 */
 exports.adminOnly = (req, res, next) => {
    const user = req.authedUser;
    if (user.rolename === 'admin') {
        return next();
    }

    res.status(403).json({ message: 'administrator scope!' });
};
