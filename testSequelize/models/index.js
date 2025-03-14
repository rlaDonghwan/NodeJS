const Sequelize = require('sequelize'); // Sequelize 모듈을 가져옴
const User = require('./user'); // User 모델을 가져옴
const Comment = require('./comment'); // Comment 모델을 가져옴

const env = process.env.NODE_ENV || 'development'; // 환경 변수를 설정, 기본값은 'development'

const config = require(__dirname + '/../config/config.json')[env]; // 환경 설정 파일을 가져와 현재 환경에 맞는 설정을 로드

const db = {}; // 데이터베이스 객체를 초기화

const sequelize = new Sequelize.Sequelize(config.database, config.username, config.password, config); // Sequelize 인스턴스를 생성하여 데이터베이스 연결 설정

db.sequelize = sequelize; // 생성한 Sequelize 인스턴스를 db 객체에 추가

db.User = User; // User 모델을 db 객체에 추가
db.Comment = Comment; // Comment 모델을 db 객체에 추가

User.initate(sequelize); // User 모델 초기화
Comment.initate(sequelize); // Comment 모델 초기화

User.associate(db); // User 모델 관계 설정
Comment.associate(db); // Comment 모델 관계 설정  

module.exports = db; // db 객체를 모듈로 내보냄