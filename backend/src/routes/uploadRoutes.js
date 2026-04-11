import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Save files to 'uploads/' directory in the backend
  },
  filename(req, file, cb) {
    // Format: fieldname-timestamp.ext
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
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

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// @desc    Upload an image
// @route   POST /api/upload
// @access  Public
router.post('/', upload.single('image'), (req, res) => {
  // Check if file was uploaded
  if (!req.file) {
    return res.status(400).send({ message: 'Please upload a file' });
  }

  // Return the path starting from root, so the frontend can build: http://localhost:5000/uploads/filename.ext
  res.send(`/${req.file.path.replace(/\\/g, '/')}`);
});

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Public
router.post('/multiple', upload.array('images', 10), (req, res) => {
  // Check if files were uploaded
  if (!req.files || req.files.length === 0) {
    return res.status(400).send({ message: 'Please upload at least one file' });
  }

  // Return array of paths
  const filePaths = req.files.map(file => `/${file.path.replace(/\\/g, '/')}`);
  res.send(filePaths);
});

export default router;
