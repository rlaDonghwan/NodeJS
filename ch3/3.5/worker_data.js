const {
  Worker, isMainThread, parentPort, workerData,
} = require('worker_threads');

if (isMainThread) { // 부모일 때
  const threads = new Set(); // 워커 스레드를 관리할 Set 객체 생성
  threads.add(new Worker(__filename, { // 현재 파일을 워커 스레드로 실행
    workerData: { start: 1 }, // workerData로 데이터를 보냄
  }));
  threads.add(new Worker(__filename, { // 현재 파일을 워커 스레드로 실행
    workerData: { start: 2 }, // workerData로 데이터를 보냄
  }));
  for (let worker of threads) {
    worker.on('message', message => console.log('from worker', message)); // 워커 스레드로부터 메시지를 받음
    worker.on('exit', () => { // 워커 스레드가 종료되면
      threads.delete(worker);// Set 객체에서 삭제
      if (threads.size === 0) { // 모든 워커 스레드가 종료되면
        console.log('job done'); // 'job done' 출력
      }
    });
  }
} else { // 워커일 때 워커 스레드로부터 메시지를 받음
  const data = workerData; // workerData로 전달된 데이터를 가져옴
  parentPort.postMessage(data.start + 100); // 부모 스레드로 메시지를 보냄
}
