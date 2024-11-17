const express = require('express');
const bookpool = require('../db').pool;
const { upload } = require('../uploadConfig');

const router = express.Router();

router.post('/upload-book', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'coverPhoto', maxCount: 1 }]), async (req, res) => {
    const { title, description, price, author, uploadedBy, genre, webtoons } = req.body;
    const file = req.files['file'][0];
    const coverPhoto = req.files['coverPhoto'][0];

    const fileUrl = `/uploads/books/${file.filename}`;
    const coverPhotoUrl = `/uploads/covers/${coverPhoto.filename}`;

    try {
        const result = await bookpool.query(
            `INSERT INTO books (title, author, description, genre, price, file_path, uploaded_by, cover_photo_path, webtoons) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [title, author, description, genre, price, fileUrl, uploadedBy, coverPhotoUrl, webtoons]  // Include webtoons
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error uploading book:', error);
        res.status(500).json({ message: 'Error uploading book' });
    }
});

module.exports = router;
