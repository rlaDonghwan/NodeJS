const { Worker, isMainThread, parentPort, workerData } = require('worker_threads'); // worker_threads 모듈에서 Worker, isMainThread, parentPort, workerData를 가져온다.

const min = 2;
let primes = [];

function findPrimes(start, end) {
  let isPrime = true;
  for (let i = start; i <= end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
    isPrime = true;
  }
}

if (isMainThread) {
  const max = 10000000;
  const threadCount = 8; // 8개의 스레드를 사용한다.
  const threads = new Set(); // Set 객체를 생성한다.
  const range = Math.floor((max - min) / threadCount); // 범위를 계산한다. floor 소수점 버림
  let start = min;
  console.time('prime');
  for (let i = 0; i < threadCount - 1; i++) { // 7개의 스레드를 생성한다.
    const end = start + range - 1;// 범위를 계산한다.
    threads.add(new Worker(__filename, { workerData: { start, range: end } })); // Worker 객체를 생성한다.
    start += range; // 시작값을 변경한다.
  }
  threads.add(new Worker(__filename, { workerData: { start, range: max } }));// 마지막 스레드를 생성한다.
  for (let worker of threads) {
    worker.on('error', (err) => {
      throw err;
    });
    worker.on('exit', () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.timeEnd('prime');
        console.log(primes.length);
      }
    });
    worker.on('message', (msg) => {
      primes = primes.concat(msg);
    });
  }
} else {
  findPrimes(workerData.start, workerData.range);
  parentPort.postMessage(primes);
}
