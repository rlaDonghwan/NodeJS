const express = require("express"); // Express 모듈을 가져옴
const cookieParser = require("cookie-parser"); // 쿠키 파싱 미들웨어를 가져옴
const morgan = require("morgan"); // HTTP 요청 로깅 미들웨어를 가져옴
const path = require("path"); // 파일 및 디렉토리 경로 관련 유틸리티를 가져옴
const session = require("express-session"); // 세션 관리 미들웨어를 가져옴
const nunjucks = require("nunjucks"); // 템플릿 엔진 Nunjucks를 가져옴
const dotenv = require("dotenv"); // 환경 변수 관리 모듈을 가져옴
dotenv.config(); // .env 파일에 정의된 환경 변수를 로드

const pageRouter = require("./routes/page"); // 페이지 라우터를 가져옴

const app = express(); // Express 애플리케이션 생성
app.set("port", process.env.PORT || 8001); // 포트 설정, 환경 변수에 PORT가 설정되어 있지 않으면 8001번 포트를 사용
app.set("view engine", "html"); // 뷰 엔진을 'html'로 설정
nunjucks.configure("views", {
  express: app, // Express 애플리케이션을 Nunjucks에 연결
  watch: true, // 템플릿 파일 변경 시 자동으로 다시 로드
});
app.use(morgan("dev")); // HTTP 요청 로깅 미들웨어 설정 (개발 모드)
app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 제공 미들웨어 설정
app.use(express.json()); // JSON 요청 본문을 파싱하는 미들웨어 설정
app.use(express.urlencoded({ extended: false })); // URL-encoded 요청 본문을 파싱하는 미들웨어 설정
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키 파싱 및 서명 처리 미들웨어 설정
app.use(
  session({
    resave: false, // 세션이 수정되지 않아도 다시 저장할지 여부
    saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
    secret: process.env.COOKIE_SECRET, // 세션 암호화에 사용할 비밀 키
    cookie: {
      httpOnly: true, // 클라이언트에서 쿠키를 수정할 수 없도록 설정
    },
  })
);

app.use("/", pageRouter); // 페이지 라우터를 사용하여 루트 경로에 대한 요청을 처리

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`); // 요청한 라우터가 없을 때 에러 생성
  error.status = 404; // 에러 상태 코드를 404로 설정
  next(error); // 다음 미들웨어로 에러 전달
});

app.use((err, req, res, next) => {
    res.locals.message = err.message; // 에러 메시지를 뷰로 전달
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 개발 환경에서만 에러 스택을 전달
    res.status(err.status || 500); // 에러 상태 코드를 설정
    res.render('error'); // 에러 페이지 렌더링
  });  

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기 중");
    }); // 서버를 실행하여 요청 대기


    