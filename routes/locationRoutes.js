const router = require('express').Router();
const c = require('../controllers/locationController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.route('/').get(c.getLocations).post(c.addLocation);
router.route('/:id').put(c.updateLocation).delete(c.deleteLocation);

module.exports = router;
