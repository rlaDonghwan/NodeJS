const dotenv = require('dotenv');  // 환경변수 파일(.env)을 로드하는 모듈 불러오기
dotenv.config();                    // .env 파일 읽어서 process.env에 넣기

const express = require('express');  // 익스프레스 모듈 불러오기
const path = require('path');        // 경로 관련 모듈 불러오기
const morgan = require('morgan');    // 요청 로그 남기는 모듈 불러오기
const cookieParser = require('cookie-parser');  // 쿠키 파싱 미들웨어 불러오기
const session = require('express-session');     // 세션 관리 미들웨어 불러오기
const multer = require('multer');    // 파일 업로드 처리 미들웨어 불러오기
const fs = require('fs');            // 파일시스템 모듈 불러오기
const { v4: uuidv4 } = require('uuid');  // uuid 모듈에서 v4 메서드 불러오기 (파일명 랜덤화에 사용)

const app = express();  // 익스프레스 애플리케이션 생성

app.set('port', process.env.PORT || 3000);  // 사용할 포트 설정 (환경변수 없으면 3000 사용)
//-----------------------------------------------------------------------------------
const indexRouter = require('./routes');  // 라우터 불러오기
const userRouter = require('./routes/user');  // user 라우터 불러오기



const upload = multer({  // multer 설정 시작
  storage: multer.diskStorage({  // 파일 저장 방식 설정 (디스크에 저장)
    destination(req, file, done) {  // 저장 경로 설정
      const uploadPath = path.join(__dirname, 'uploads');  // 현재 폴더 밑에 uploads 폴더 지정
      if (!fs.existsSync(uploadPath)) {  // uploads 폴더 없으면 생성
        fs.mkdirSync(uploadPath);
      }
      done(null, uploadPath);  // 실제 저장 경로 지정
    },
    filename(req, file, done) {  // 저장할 파일명 설정
      const ext = path.extname(file.originalname);  // 원본 파일의 확장자 추출
      done(null, `${uuidv4()}${ext}`);  // 파일명은 랜덤 UUID + 원래 확장자
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },  // 파일 크기 제한 (10MB)
});

// 미들웨어 설정

app.use(morgan('dev'));  // 요청 로그 출력 (개발용 설정)


app.use('/', express.static(path.join(__dirname, 'public')));  // 정적 파일 제공(public 폴더)
app.use(express.json());  // 요청 본문(json) 파싱
app.use(express.urlencoded({ extended: false }));  // 요청 본문(form-urlencoded) 파싱
app.use(cookieParser(process.env.COOKIE_SECRET));  // 쿠키 파싱 및 서명 처리
app.use(session({  // 세션 설정
  resave: false,  // 요청이 왔을 때 세션에 수정사항이 없어도 다시 저장할지 여부
  saveUninitialized: false,  // 세션이 필요하기 전까지는 세션을 구동하지 않음
  secret: process.env.COOKIE_SECRET,  // 쿠키 암호화 키 (env에서 불러옴)
  cookie: { 
    httpOnly: true,  // 자바스크립트에서 쿠키 접근 금지
    secure: false,   // https가 아닌 환경에서도 사용
  },
  name: 'session-cookie',  // 세션 쿠키 이름 지정
}));

// 업로드 화면 라우터
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));  // 파일 업로드 폼 제공
});

// 파일 업로드 처리 라우터
app.post('/upload', upload.fields([
  { name: 'image1', maxCount: 1 },  // image1은 1개만
  { name: 'image2', maxCount: 1 },  // image2도 1개만
]), (req, res) => {
  console.log(req.files.image1);  // 업로드된 image1 파일 정보 출력
  console.log(req.files.image2);  // 업로드된 image2 파일 정보 출력
  console.log(req.body.title);    // 함께 전송된 제목 데이터 출력
  res.send('ok');  // 업로드 완료 응답
});

app.use('/', indexRouter);  // 라우터 등록 
app.use('/user', userRouter);  // user 라우터 등록 

app.use((req, res, next) => {  // 404 처리 미들웨어
  res.status(404).send('Not Found');
});
// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err);  // 에러 로그 출력
  res.status(500).send(err.message);  // 500 에러 응답
});

// 서버 실행
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');  // 서버 시작 로그
});