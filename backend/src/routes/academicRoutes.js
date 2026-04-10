import express from 'express';
import {
  getAcademics,
  createAcademic,
  updateAcademic,
  deleteAcademic,
} from '../controllers/academicController.js';

const router = express.Router();

router.route('/').get(getAcademics).post(createAcademic);
router.route('/:id').put(updateAcademic).delete(deleteAcademic);

export default router;
