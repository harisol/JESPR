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

const router = Router();

// register jwt middleware to this router
router.use(checkToken);

router.get('/', (_req, res) => res.json({ message: 'Welcome' }))
router.post('/login', validateLogin(), auth.login); // for logout, just detroy token in client storage

router.get('/role', adminOnly, roleController.listRole);
router.post('/role', validateCreateRole(), roleController.createRole);

router.get('/user', userController.listUser);
router.post('/user', validateCreateUser(), userController.createUser);

router.post('/outlet', validateCreateOutlet(), outletController.createOutlet);
router.get('/outlet', outletController.listOutlet);

module.exports = router;
