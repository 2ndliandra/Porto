import express from 'express';
import {
  getSoftSkills,
  getSoftSkillById,
  createSoftSkill,
  updateSoftSkill,
  deleteSoftSkill,
} from '../controllers/softSkillController.js';

const router = express.Router();

router.route('/').get(getSoftSkills).post(createSoftSkill);
router
  .route('/:id')
  .get(getSoftSkillById)
  .put(updateSoftSkill)
  .delete(deleteSoftSkill);

export default router;
