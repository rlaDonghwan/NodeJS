const crypto = require('crypto');

crypto.randomBytes(64, (err, buf) => { //64바이트 길이의 랜덤한 문자열 생성 후 콜백함수 실행
  const salt = buf.toString('base64'); //base64로 인코딩
  console.log('salt:', salt);//salt값 출력
  crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => { //비밀번호, salt, 반복횟수, 출력바이트, 해시 알고리즘
    console.log('password:', key.toString('base64'));//비밀번호 출력
  });
});
