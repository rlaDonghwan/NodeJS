const http = require('http'); //  1. http 모듈을 require로 불러온다.

const server = http.createServer((req, res) => { // 2. http 모듈에는 createServer 메서드가 있다. 이 메서드는 인자로 요청에 대한 콜백 함수를 넣을 수 있다.
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
});
server.listen(8080); // 3. listen 메서드에 포트와 호스트를 넣어 서버를 실행한다.

server.on('listening', () => {
  console.log('8080번 포트에서 서버 대기 중입니다!');
});
server.on('error', (error) => {
  console.error(error);
});
