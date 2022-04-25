const { User } = require("../database/models");
const { internalServerError } = require("../etc/error-handler");
const { signJWT } = require("../etc/my-jwt");

/** @type {import("express").RequestHandler} */
exports.login = (req, res) => {
    const username = req.body.username;
    User.findByUserName(username)
        .then(async user => {
            if (!user) {
                return res.status(401).json({ message: 'wrong username' });
            }

            const role = await user.getRole();

            // data can be retrieved in token
            const payload = {
                id: user.id,
                username: user.username,
                rolename: role?.rolename
            };

            const token = signJWT(payload);

            // res.cookie('goodie-token', token, { secure: true, httpOnly: true })
            res.status(200).json({
                auth: true,
                accessToken: token,
            });

        }).catch(error => {
            internalServerError(error, res)
        });
};
