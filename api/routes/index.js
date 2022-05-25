const { Router } = require('express');
const auth = require('../controllers/auth.controller');
const { checkToken, adminOnly } = require('../etc/middleware');
const outletController = require('../controllers/outlet.controller');
const roleController = require('../controllers/role.controller');
const userController = require('../controllers/user.controller');
const { validateCreateRole } = require('../validation/role.validation');
const { validateCreateUser } = require('../validation/user.validation');
const { validateCreateOutlet } = require('../validation/outlet.validation');
const { validateLogin } = require('../validation/auth.validation');
const { date } = require('../etc/helper');

const router = Router();

router.get('/', (_req, res) => {
    res.json({ message: `Today is ${date('dddd, DD MMM YYYY')}` });
});

// for logout, just detroy token in client storage
router.post('/login', validateLogin(), auth.login);


/**
 * this is the simpler way to add checkToken middleware,
 * but it will keep checking the jwt on any invalid path
 * (e.g api/{invalid-path}),
 * hence, it's better adding middleware on every path
 */
// router.use(checkToken);

// add middleware checkToken to theese routers
[
    {
        path: '/check-token',
        method: 'get',
        handlers: [
            (_req, res) => res.json({ message: 'token valid' }),
        ]
    },
    {
        path: '/user',
        method: 'get',
        handlers: [userController.listUser]
    },
    {
        path: '/user',
        method: 'post',
        handlers: [validateCreateUser(), userController.createUser]
    },
    {
        path: '/role',
        method: 'get',
        handlers: [adminOnly, roleController.listRole]
    },
    {
        path: '/role',
        method: 'post',
        handlers: [validateCreateRole(), roleController.createRole]
    },
    {
        path: '/outlet',
        method: 'get',
        handlers: [outletController.listOutlet]
    },
    {
        path: '/outlet',
        method: 'post',
        handlers: [validateCreateOutlet(), outletController.createOutlet]
    },
].forEach(({ path, method, handlers }) => {
    router[method](path, checkToken, handlers);
});

module.exports = router;
