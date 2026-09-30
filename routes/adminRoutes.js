const router = require('express').Router();
const c = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect, authorize('admin'));
router.get('/health', c.systemHealth);
router.get('/users', c.getUsers);
router.patch('/users/:id/status', c.setUserStatus);
router.delete('/users/:id', c.deleteUser);

module.exports = router;
