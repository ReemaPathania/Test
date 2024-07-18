
const express = require("express");
const multer = require('multer');
const Image = require('./model/image');
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/db', {})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Set up multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to upload a single image
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const newImage = new Image({
            name: req.file.originalname,
            data: req.file.buffer,
            contentType: req.file.mimetype
        });

        await newImage.save();

        res.status(201).send('Image uploaded successfully');
    } catch (err) {
        res.status(400).send('Error uploading image: ' + err.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
