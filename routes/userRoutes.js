// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, getUserById, getUserVehicles, getVehicleDetails } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/getUserData', getUserById);
router.post('/vehicles', getUserVehicles);
router.post('/getVehicle', getVehicleDetails);

module.exports = router;
