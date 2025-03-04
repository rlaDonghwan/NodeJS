const fs = require('fs'); // 파일 시스템 모듈

fs.readFile('./readme.txt', (err, data) => { // 파일 읽기 메서드 readFile (비동기) / readFileSync (동기) 
  if (err) {  // 에러 발생 시 에러 로그 출력
    throw err;
  }
  console.log(data); // 파일 내용 출력
  console.log(data.toString());// 파일 내용을 문자열로 출력
});
