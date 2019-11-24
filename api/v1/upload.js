const express = require('express'),
    router = express.Router(),
    logger = require("../../middleware/logger"),
    multer = require('multer'),
    {User} = require("../../models/User");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../uploads')
    },
    filename: function (req, file, cb) {
        cb(null,  Date.now() + file.originalName)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimeType === 'image/jpeg' || file.mimeType === 'image/png')
        cb(null, true);
    else
        cb(null, false)
};

const upload = multer({
   storage: storage,
   limits: {
       fileSize: 1024*1024*5
   },
   fileFilter: fileFilter
});

router.post('/uploadmulter', upload.single('imageData'), async (req, res) => {
    const user = req['user'];

});