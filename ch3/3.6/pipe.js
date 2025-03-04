const fs = require('fs');

const readStream = fs.createReadStream('readme4.txt'); // 파일을 읽어오는 스트림 생성
const writeStream = fs.createWriteStream('writeme3.txt'); // 파일을 쓰는 스트림 생성
readStream.pipe(writeStream);
