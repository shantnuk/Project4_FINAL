const express = require('express')
const router = express.Router();
const videoController = require('../component/component_video')

// as defined in the assignment

router.get('/dashboard', (req, res) => {
  res.redirect('/video/dashboard/all')});
router.get('/dashboard/:videofilter', videoController.getDashboard)
router.get('/new_video', videoController.getNewVideo)
router.post('/new', videoController.postNewVideo)

module.exports = router;
