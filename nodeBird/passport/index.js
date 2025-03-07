
// --- 모듈 임포트 ---
const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => { // 모듈 내보내기
    passport.serializeUser((user, done) => { // 사용자 정보 객체를 세션에 아이디로 저장
        done(null, user.id); // done(에러, 결과값)
    });

    passport.deserializeUser((id, done) => { // 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러옴
        User.findOne({ where: { id },
            include: [{
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followers',
            }, {
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followings',
            }],
        })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local();
    kakao();
};