import express from 'express';
import {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experienceController.js';

const router = express.Router();

router.route('/').get(getExperiences).post(createExperience);
router.route('/:id').get(getExperienceById).put(updateExperience).delete(deleteExperience);

export default router;
