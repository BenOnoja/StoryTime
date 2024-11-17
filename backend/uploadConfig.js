// uploadConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure directories exist
const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Ensure that the upload directories exist
const booksDir = path.join(__dirname, 'uploads', 'books');
const coversDir = path.join(__dirname, 'uploads', 'covers');
ensureDirectoryExists(booksDir);
ensureDirectoryExists(coversDir);

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === 'coverPhoto') {
                cb(null, coversDir);
            } else if (file.fieldname === 'file') {
                cb(null, booksDir);
            }
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    }),
    limits: {
        fileSize: 100 * 1024 * 1024, // 100 MB limit
    },
});

module.exports = {
    upload,
    booksDir,
    coversDir,
};
