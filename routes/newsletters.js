const express = require('express');
const newsletterController = require('../controllers/newsletterController');
const commentController = require('../controllers/commentController');

const router = express.Router();

// newsletter
router.get(`/`, newsletterController.list);
router.post(`/`, newsletterController.new);
router.get(`/:slug`, newsletterController.detail);
router.put(`/:slug`, newsletterController.edit);
router.delete(`/:slug`, newsletterController.delete);

// comments
router.get(`/:slug/new-comment`, commentController.comment);
router.post(`/:slug/new-comment`, commentController.newComment);

module.exports = router;
