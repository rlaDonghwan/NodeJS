const express = require('express'); // Express 모듈을 가져옴
const path = require('path'); // Path 모듈을 가져옴
const morgan = require('morgan'); // Morgan 모듈을 가져옴 (HTTP 요청 로깅 미들웨어)
const nunjucks = require('nunjucks'); // Nunjucks 모듈을 가져옴 (템플릿 엔진)

const { sequelize } = require('./models'); // Sequelize 인스턴스를 가져옴

const app = express(); // Express 애플리케이션 생성

app.set('port', process.env.PORT || 3001); // 포트 설정, 환경 변수에 PORT가 설정되어 있지 않으면 3001번 포트를 사용
app.set('view engine', 'html'); // 뷰 엔진을 'html'로 설정
nunjucks.configure('views', {
  express: app, // Express 애플리케이션을 Nunjucks에 연결
  watch: true, // 템플릿 파일 변경 시 자동으로 다시 로드
});

sequelize.sync({ force: false }) // 데이터베이스와 동기화, 기존 데이터는 유지
    .then(() => {
        console.log('데이터베이스 연결 성공'); // 동기화 성공 시 메시지 출력
    })
    .catch((err) => {
        console.error(err); // 동기화 실패 시 에러 출력
    });

app.use(morgan('dev')); // HTTP 요청 로깅 미들웨어 설정 (개발 모드)
app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일 제공 미들웨어 설정
app.use(express.json()); // JSON 요청 본문을 파싱하는 미들웨어 설정
app.use(express.urlencoded({ extended: false })); // URL-encoded 요청 본문을 파싱하는 미들웨어 설정

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`); // 요청한 라우터가 없을 때 에러 생성
    error.status = 404; // 에러 상태 코드를 404로 설정
    next(error); // 다음 미들웨어로 에러 전달
});

app.use((err, req, res, next) => {
    res.locals.message = err.message; // 에러 메시지를 로컬 변수에 설정
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 개발 환경에서는 에러 스택을 로컬 변수에 설정
    res.status(err.status || 500); // 에러 상태 코드를 설정, 기본값은 500
    res.render('error'); // 에러 페이지 렌더링
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중'); // 서버가 시작되면 메시지 출력
});