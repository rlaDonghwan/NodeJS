const fs = require('fs').promises; // 파일 시스템 모듈

fs.readFile('./readme.txt') // 파일 읽기 메서드 readFile 
  .then((data) => { // 성공 시 data 출력 / 실패 시 에러 출력
    console.log(data);
    console.log(data.toString()); // 파일 내용을 문자열로 출력
  })
  .catch((err) => {
    console.error(err);
  });
