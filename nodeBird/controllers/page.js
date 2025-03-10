const {User,Post} = require('../models');

// 프로필 페이지 렌더링 함수
exports.renderProfile = (req, res) => {
    res.render('profile', { title: '내 정보 - NodeBird' }); // 'profile' 뷰를 렌더링하고, 제목을 '내 정보 - NodeBird'로 설정
};

// 회원가입 페이지 렌더링 함수
exports.renderJoin = (req, res) => {
    res.render('join', { title: '회원가입 - NodeBird' }); // 'join' 뷰를 렌더링하고, 제목을 '회원가입 - NodeBird'로 설정
};

// 메인 페이지 렌더링 함수
exports.renderMain =  async(req, res, next) => {

    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['id', 'nick'],
            },
            order: [['createdAt', 'DESC']],
        });
        res.render('main', {
            title: 'NodeBird',
            twits: posts,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }


    // const twits = []; // 빈 트윗 배열 생성
    // res.render('main', {
    //     title: 'NodeBird', // 제목을 'NodeBird'로 설정
    //     twits, // 트윗 배열을 뷰에 전달
    // });
};

exports.renderHashtag = async (req, res, next) => {
    const query = req.query.hashtag;
    if (!query) {
        return res.redirect('/');
    }
    try{
        const hashtag = await Hashtag.findOne({ where: { title: query } });
        let posts = [];
        if(hashtag){
            posts = await hashtag.getPosts({ include: [{ model: User }] });
        }
        return res.render('main', {
            title: `${query} | NodeBird`,
            twits: posts,
        });
    }catch (error) {
        console.error(error);
        return next(error);
    }


};