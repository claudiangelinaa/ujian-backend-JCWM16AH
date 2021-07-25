const express = require('express');
const router = express.Router();

const authController = require('./controller/authController');
const moviesController = require('./controller/moviesController')

router.post('/user/register', authController.register)
router.post('/user/login', authController.login)
router.patch('/user/deactive', authController.deactive)
router.patch('/user/activate', authController.activate)
router.patch('/user/close', authController.close)

router.get('/movies/get/all', moviesController.selectAll)
router.get('/movies/get', moviesController.selectByParams)
router.post('/movies/add', moviesController.insert)
router.patch('/movies/edit/:id', moviesController.edit)
router.patch('/movies/set/:id', moviesController.updateSchedule)

module.exports = router;