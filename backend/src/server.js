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

app.use('/api/projects', projectRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/softskills', softSkillRoutes);
app.use('/api/academics', academicRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/learnings', learningRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
