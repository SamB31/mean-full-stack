const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/about');

router.get('/', aboutController.renderAbout);

module.exports = router;