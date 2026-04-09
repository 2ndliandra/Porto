import express from 'express';
import {
  getLearnings,
  createLearning,
  updateLearning,
  deleteLearning,
} from '../controllers/learningController.js';

const router = express.Router();

router.route('/').get(getLearnings).post(createLearning);
router.route('/:id').put(updateLearning).delete(deleteLearning);

export default router;
