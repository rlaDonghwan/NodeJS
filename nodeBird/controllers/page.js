// 프로필 페이지 렌더링 함수
exports.renderProfile = (req, res) => {
    res.render('profile', { title: '내 정보 - NodeBird' }); // 'profile' 뷰를 렌더링하고, 제목을 '내 정보 - NodeBird'로 설정
};

// 회원가입 페이지 렌더링 함수
exports.renderJoin = (req, res) => {
    res.render('join', { title: '회원가입 - NodeBird' }); // 'join' 뷰를 렌더링하고, 제목을 '회원가입 - NodeBird'로 설정
};

// 메인 페이지 렌더링 함수
exports.renderMain = (req, res, next) => {
    const twits = []; // 빈 트윗 배열 생성
    res.render('main', {
        title: 'NodeBird', // 제목을 'NodeBird'로 설정
        twits, // 트윗 배열을 뷰에 전달
    });
};