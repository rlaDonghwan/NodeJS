const fs = require('fs'); // 파일 시스템 모듈

fs.writeFile('./writeme.txt', '글이 입력됩니다', (err) => { // 파일 쓰기 메서드 writeFile (비동기) / writeFileSync (동기)
  if (err) {
    throw err;
  }
  fs.readFile('./writeme.txt', (err, data) => { // 파일 읽기 메서드 readFile (비동기)
    if (err) {
      throw err;
    }
    console.log(data.toString()); //  파일 내용 출력
  });
});
