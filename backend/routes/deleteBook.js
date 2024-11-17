// bookRoutes.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const deletepool= require('../db.js').pool; // Assuming you have a database deletepool instance for PostgreSQL
const { booksDir, coversDir } = require('../uploadConfig');

const router = express.Router();

// DELETE route to delete a book by ID
router.delete('/delete-book/:id', async (req, res) => {
    const bookId = parseInt(req.params.id);

    try {
        // Get the file paths for the book file and cover photo
        const result = await deletepool.query(
            'SELECT file_path, cover_photo_path FROM books WHERE id = $1',
            [bookId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const { file_path, cover_photo_path } = result.rows[0];

        // Delete dependent records from transactions, bookreviews, and reading_progress
        await deletepool.query('DELETE FROM transactions WHERE book_id = $1', [bookId]);
        await deletepool.query('DELETE FROM bookreviews WHERE book_id = $1', [bookId]);
        await deletepool.query('DELETE FROM reading_progress WHERE book_id = $1', [bookId]);

        // Delete the book record from the database
        await deletepool.query('DELETE FROM books WHERE id = $1', [bookId]);

        // Delete the book file
        if (file_path) {
            const filePath = path.join(booksDir, path.basename(file_path));
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        // Delete the cover photo if it exists
        if (cover_photo_path) {
            const coverPath = path.join(coversDir, path.basename(cover_photo_path));
            if (fs.existsSync(coverPath)) {
                fs.unlinkSync(coverPath);
            }
        }

        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
