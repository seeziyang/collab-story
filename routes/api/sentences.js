const express = require('express');
const router = express.Router();

const SentenceController = require('../../controllers/sentences');

router.route('/').get(SentenceController.getAll).post(SentenceController.create);

router
  .route('/:id')
  .get(SentenceController.get)
  .put(SentenceController.update)
  .patch(SentenceController.update)
  .delete(SentenceController.delete);

module.exports = router;
