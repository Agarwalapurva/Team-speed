const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Member = require('../models/Member');

// --------------------- Multer Storage Setup ---------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1681234567890.jpg
  }
});

// --------------------- File Type Filter ---------------------
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpg, jpeg, png, gif) are allowed'));
  }
};

// --------------------- Multer Upload Middleware ---------------------
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB max size
  fileFilter: fileFilter
});

// --------------------- POST /api/members ---------------------
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, role, email } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: 'Please upload an image' });
    }

    const newMember = new Member({
      name,
      role,
      email,
      image: req.file.path.replace(/\\/g, '/')// path will be like "uploads/1681234567890.jpg"
    });

    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (err) {
    console.error(err.message);

    if (err.code === 11000) {
      return res.status(400).json({ msg: 'A member with this email already exists' });
    }

    res.status(500).json({ msg: 'Server Error' });
  }
});

// --------------------- GET /api/members ---------------------
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// --------------------- GET /api/members/:id ---------------------
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ msg: 'Member not found' });
    }

    res.json(member);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Member not found' });
    }

    res.status(500).json({ msg: 'Server Error' });
  }
});

// --------------------- Multer Error Handler ---------------------
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ msg: err.message }); // e.g., file too large
  } else if (err) {
    return res.status(400).json({ msg: err.message }); // e.g., invalid file type
  }

  next();
});

module.exports = router;
