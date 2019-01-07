const express = require('express');
const indexController = require('../controllers/indexController');

const router = express.Router();

router.get(`/`, indexController.dashboard);
router.get(`/about`, indexController.about);
router.post(`/about/writers`, indexController.newWriter);
router.get(`/contact`, indexController.contact);
router.post(`/contact`, indexController.newContact);

module.exports = router;
