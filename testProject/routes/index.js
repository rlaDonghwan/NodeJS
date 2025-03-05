const express = require('express');
const router = express.Router();

// GET / 요청시 index.pug 렌더링
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;