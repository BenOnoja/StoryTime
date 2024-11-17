// bookRoutes.js

const express = require('express');
const poolb = require('../db').pool;
const { upload } = require('../uploadConfig');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Edit book details
router.put('/edit-book/:id', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'coverPhoto', maxCount: 1 }]), async (req, res) => {
    const { id } = req.params;
    const { title, description, price, genre, webtoons } = req.body;

    try {
        // Fetch the current book details
        const { rows } = await poolb.query('SELECT * FROM books WHERE id = $1', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Book not found' });

        const book = rows[0];
        let filePath = book.file_path;
        let coverPhotoPath = book.cover_photo_path;

        // Update file if a new one is provided
        if (req.files['file']) {
            const newFile = req.files['file'][0];
            filePath = `/uploads/books/${newFile.filename}`;

            // Delete the old file if it exists
            if (book.file_path) fs.unlinkSync(path.join(__dirname, '..', book.file_path));
        }

        // Update cover photo if a new one is provided
        if (req.files['coverPhoto']) {
            const newCoverPhoto = req.files['coverPhoto'][0];
            coverPhotoPath = `/uploads/covers/${newCoverPhoto.filename}`;

            // Delete the old cover photo if it exists
            if (book.cover_photo_path) fs.unlinkSync(path.join(__dirname, '..', book.cover_photo_path));
        }

        // Update the book in the database
        const updateQuery = `
            UPDATE books
            SET title = $1, description = $2, price = $3, genre = $4, file_path = $5, cover_photo_path = $6, webtoons = $7
            WHERE id = $8
            RETURNING *`;
        const updatedBook = await poolb.query(updateQuery, [title, description, price, genre, filePath, coverPhotoPath, webtoons, id]);

        res.status(200).json(updatedBook.rows[0]);
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ message: 'Error updating book' });
    }
});



module.exports = router;
