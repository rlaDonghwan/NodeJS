const express = require('express'); // Express 모듈을 가져옴

const { renderProfile, renderJoin, renderMain } = require('./controllers/page'); // 페이지 렌더링 컨트롤러를 가져옴

const router = express.Router(); // 라우터 객체 생성

// 모든 요청에 대해 공통적으로 실행되는 미들웨어
router.use((req, res, next) => {
    res.locals.user = null; // 사용자 정보를 초기화
    res.locals.followerCount = 0; // 팔로워 수를 초기화
    res.locals.followingCount = 0; // 팔로잉 수를 초기화
    res.locals.followerIdList = []; // 팔로워 ID 리스트를 초기화
    next(); // 다음 미들웨어로 이동
});

// 프로필 페이지 요청 처리
router.get('/profile', renderProfile);

// 회원가입 페이지 요청 처리
router.get('/join', renderJoin);

// 메인 페이지 요청 처리
router.get('/', renderMain);

module.exports = router; // 라우터 모듈을 내보냄