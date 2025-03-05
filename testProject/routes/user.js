const express = require('express');

const router = express.Router();

// GET /user 라우터
router.get('/', (req, res) => {
  // res.send('Hello, User');
  res.render('index', { title: 'Express' });
});

router.get('/user/:id', (req, res) => {s
  console.log(req.params.id, req.query);
  //http://localhost:3000/user/1?limit=5&skip=10 
  //여기서 ID 값은 params로 받고, limit, skip 값은 query로 받는다.
});

router.get('/user/like', (req, res) => { //이거에 해당하지 않는 미들웨어가 있으면 apps에 있는 에러 미들웨어 자동 실행 
  // 그래도 웬만하면 미들웨어를 만드는게 좋다
  console.log("전혀 실행되지 않습니다.");
});


module.exports = router;
