const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { afterUploadImage, uploadPost } = require('../controllers/post');
const { isLoggedIn } = require('../middlewares');
const Post = require('../models/post'); // Post 모델 가져오기

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// POST /post/img
router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage);

// POST /post
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), uploadPost);

// POST /post/:id/like
router.post('/:id/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });
    if (post) {
      await post.addLiker(req.user.id);
      res.send('OK');
    } else {
      res.status(404).send('no post');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /post/:id/unlike
router.delete('/:id/unlike', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });
    if (post) {
      await post.removeLiker(req.user.id);
      res.send('OK');
    } else {
      res.status(404).send('no post');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;