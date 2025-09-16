const router = require('express').Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');


// router.post('/add-users', authenticate, userController.createUser);
// router.get('/get-users', authenticate, userController.getUsers);
// router.get('/get-user/:id', authenticate, userController.getSingleUser);
// router.put('/update-user/:id', authenticate, userController.updateUser);
// router.delete('/delete-user/:id', authenticate, userController.deleteUser);

router.post('/add-users', userController.createUser);
router.get('/get-users', userController.getUsers);
router.get('/get-user/:id', userController.getSingleUser);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;