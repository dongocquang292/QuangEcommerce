const multer = require("multer");
const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/thumbnail');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/img');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const uploadThumbnail = multer({ storage: storage1 }).single('thumbnail');
const uploadImg = multer({ storage: storage2 }).single('img')
module.exports = { uploadImg, uploadThumbnail }