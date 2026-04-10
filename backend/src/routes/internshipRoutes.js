import express from 'express';
import {
  getInternships,
  createInternship,
  updateInternship,
  deleteInternship,
} from '../controllers/internshipController.js';

const router = express.Router();

router.route('/').get(getInternships).post(createInternship);
router.route('/:id').put(updateInternship).delete(deleteInternship);

export default router;
