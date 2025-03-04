const crypto = require('crypto'); // crypto 모듈 불러오기

const algorithm = 'aes-256-cbc'; // 사용할 알고리즘과 키, iv값 설정
const key = 'abcdefghijklmnopqrstuvwxyz123456'; // key는 32바이트여야 함
const iv = '1234567890123456'; // iv는 16바이트여야 함

const cipher = crypto.createCipheriv(algorithm, key, iv); // 암호화 생성
let result = cipher.update('암호화할 문장', 'utf8', 'base64');// 암호화할 문장과 인코딩, 출력 인코딩 설정
result += cipher.final('base64');// 출력 인코딩 설정
console.log('암호화:', result); // 암호화된 문장 출력

const decipher = crypto.createDecipheriv(algorithm, key, iv);// 복호화 생성
let result2 = decipher.update(result, 'base64', 'utf8'); // 복호화할 문장과 인코딩, 출력 인코딩 설정
result2 += decipher.final('utf8');// 출력 인코딩 설정
console.log('복호화:', result2);// 복호화된 문장 출력

