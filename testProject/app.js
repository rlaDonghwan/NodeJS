const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const multer = require('multer');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

// 미들웨어 설정
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: { httpOnly: true, secure: false },
  name: 'session-cookie',
}));

app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다.');
  next();
});

// 정상 라우터
app.get('/', (req, res) => {
  console.log('GET / 요청에서만 실행됩니다.');
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

// 서버 시작
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});