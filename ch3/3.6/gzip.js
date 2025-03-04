const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./readme4.txt');
const zlibStream = zlib.createGzip(); // zlib 스트림 생성
const writeStream = fs.createWriteStream('./readme4.txt.gz'); //파일을 쓰는 스트림 생성
readStream.pipe(zlibStream).pipe(writeStream);
