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

// Increase request timeout for large uploads (10 minutes)
app.use((req, res, next) => {
  req.setTimeout(600000);
  res.setTimeout(600000);
  next();
});

app.use(cors());
// Increase body size limits for image uploads (50MB for JSON, 50MB for URL-encoded)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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

// Global error handler for Multer and other errors
app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ message: 'File size too large. Maximum 50MB per file.' });
  }
  if (err.code === 'LIMIT_FILE_COUNT') {
    return res.status(413).json({ message: 'Too many files. Maximum 10 files at once.' });
  }
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({ message: 'Unexpected file upload field.' });
  }

  console.error('Error:', err);
  res.status(500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log("PROJECT ROUTE LOADED");
