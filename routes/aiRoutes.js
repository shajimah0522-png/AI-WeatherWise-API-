const router = require('express').Router();
const { getInsights } = require('../controllers/weatherController');
const { protect } = require('../middleware/auth');

router.post('/insights', protect, getInsights);

module.exports = router;
