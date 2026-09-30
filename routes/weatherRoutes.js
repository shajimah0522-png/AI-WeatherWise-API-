const router = require('express').Router();
const c = require('../controllers/weatherController');
const { protect } = require('../middleware/auth');

router.get('/favorites', protect, c.getFavoritesWeather); // private
router.get('/:city', c.getWeather); // public

module.exports = router;
