const express = require('express');
const router = express.Router();
const { requestByHost, requestByCommuter, getRequestsData } = require('../controllers/requestController');


router.post('/byHost', requestByHost);
router.post('/byCommuter', requestByCommuter);

router.post('/getRequests', getRequestsData);


module.exports = router;
