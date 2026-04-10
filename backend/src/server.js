import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import softSkillRoutes from './routes/softSkillRoutes.js';
import academicRoutes from './routes/academicRoutes.js';
import organizationRoutes from './routes/organizationRoutes.js';
import internshipRoutes from './routes/internshipRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import learningRoutes from './routes/learningRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import path from 'path';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/projects', projectRoutes);
app.use('/experiences', experienceRoutes);
app.use('/skills', skillRoutes);
app.use('/softskills', softSkillRoutes);
app.use('/academics', academicRoutes);
app.use('/organizations', organizationRoutes);
app.use('/internships', internshipRoutes);
app.use('/contacts', contactRoutes);
app.use('/learnings', learningRoutes);
app.use('/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log("PROJECT ROUTE LOADED");
