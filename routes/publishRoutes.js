const express = require('express');
const router = express.Router();
const publishController = require('../controllers/publishController');


router.post('/host', publishController.publishByHost);
router.post('/commuter', publishController.publishByCommuter);

router.get("/getHost", publishController.getPublishesByHost);
router.get("/getCommuter", publishController.getPublishesByCommuter);

module.exports = router;
