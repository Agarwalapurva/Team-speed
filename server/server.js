const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // <-- Import path
const fs = require('fs'); // <-- Import fs for checking directory existence
const memberRoutes = require('./routes/members');

const app = express();

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));  // for serving uploaded images

app.use('/api/members', memberRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/teamDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));
