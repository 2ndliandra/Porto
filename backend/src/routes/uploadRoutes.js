import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Config - Using memory storage for better handling of multiple files
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB per file
    files: 10, // Max 10 files
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

// @desc    Upload an image
// @route   POST /api/upload
// @access  Public
router.post('/', upload.single('image'), (req, res) => {
  // Check if file was uploaded
  if (!req.file) {
    return res.status(400).send({ message: 'Please upload a file' });
  }

  try {
    // Generate filename
    const filename = `${req.file.fieldname}-${Date.now()}${path.extname(req.file.originalname)}`;
    const filepath = path.join(uploadsDir, filename);

    // Write file from memory to disk
    fs.writeFileSync(filepath, req.file.buffer);

    // Return the path
    res.send(`/${path.join(uploadsDir, filename).replace(/\\/g, '/')}`);
  } catch (error) {
    console.error('File save error:', error);
    res.status(500).json({ message: 'Error saving file' });
  }
});

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Public
router.post('/multiple', upload.array('images', 10), (req, res) => {
  // Check if files were uploaded
  if (!req.files || req.files.length === 0) {
    return res.status(400).send({ message: 'Please upload at least one file' });
  }

  try {
    const filePaths = req.files.map(file => {
      const filename = `${file.fieldname}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}${path.extname(file.originalname)}`;
      const filepath = path.join(uploadsDir, filename);

      // Write file from memory to disk
      fs.writeFileSync(filepath, file.buffer);

      return `/${path.join(uploadsDir, filename).replace(/\\/g, '/')}`;
    });

    res.send(filePaths);
  } catch (error) {
    console.error('File save error:', error);
    res.status(500).json({ message: 'Error saving files' });
  }
});

export default router;
