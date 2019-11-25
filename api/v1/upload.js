const express = require('express'),
    router = express.Router(),
    logger = require("../../middleware/logger"),
    multer = require('multer'),
    {Profile} = require("../../models/Profile"),
    statusCodes = require('../../utils/statusCodes'),
    authenticate = require('../../middleware/authenticate'),
    path = require('path'),
    {createResponse, createErrorResponse} = require("../../utils/createServerResponse");

const myPath = path.join(__dirname, '../../uploads');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, myPath)
    },
    filename: function (req, file, cb) {
        cb(null,  Date.now().toString() + file.originalname)
    }
});

const upload = multer({
   storage: storage
});

router.post('/', authenticate, upload.single('imageData'), async (req, res) => {
    try {
        let userId = req['user']['_id'];
        let profile = await Profile.getProfile(userId);
        const filePath = "/uploads/"+req.file.filename;
        if (!profile) {
            const avatar = {
                imageName:req.body.imageName,
                imageData:filePath
            };
            profile = new Profile({
                user: userId,
                avatar: avatar
            })
            await profile.save();
        } else {
            profile = await profile.setAvatar(req.body.imageName, filePath);

        }
        res.send(createResponse(0, profile._doc));
    } catch (e) {
        res.send(createErrorResponse(statusCodes.ERROR, e.message));
    }
});

module.exports = router;