const express = require('express');

const authRouter = require('./auth/authRouter');
const userRouter = require('./users/userRouter');
const truckRouter = require('./trucks/truckRouter');

const router = express.Router();

router.use('/', authRouter);
router.use('/user', userRouter);
router.use('/truck', truckRouter);



module.exports = router;