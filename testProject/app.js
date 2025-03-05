const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cooki e-parser');
const session = require('express-session');
const dotenv = require('dotenv');


dotenv.config(); // .env 파일을 읽어서 process.env에 추가



const app = express(); // express 객체 생성
app.set('port', process.env.PORT || 3000); // 포트 설정


app.use((req, res, next) => { // 미들웨어 함수
  console.log('모든 요청에 다 실행됩니다.');
  next(); // 다음 미들웨어로 넘어감
});

app.get('/', (req, res, next) => { // / 요청이 오면 콜백 함수
  console.log('GET / 요청에서만 실행됩니다.'); // GET / 요청에서만 실행됩니다. 콘솔 출력
  next();// 다음 미들웨어로 넘어감
}, (req, res) => {
  throw new Error('에러는 에러 처리 미들웨어로 갑니다.')// 여기서 에러가 발생해서
});

app. use((err, req, res, next) => { // 에러 처리 미들웨어
  console.error(err); // 여기로 이동해서 에러 메시지 출력
  res.status(500).send(err.message); // 500 상태 코드와 에러 메시지 응답 
});

app.get('/', (req, res) => { // / 요청이 오면 콜백 함수
  // res.send('Hello, Express'); // Hello, Express 응답
  res.sendFile(path.join(__dirname, '/index.html'));  // index.html 파일 응답
});


app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
