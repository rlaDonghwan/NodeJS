# Node.js 개념 정리

<details>
<summary><strong>1. 노드 개념</strong></summary>

### 동시성(Blocking)과 비동기(Non-Blocking)
| 구분 | 설명 |
|---|---|
| **Blocking(동기)** | 대중 목욕탕처럼 앞사람이 끝날 때까지 다음 사람이 대기 |
| **Non-Blocking(비동기)** | 각자 자기 집에서 따로 샤워, 서로 기다리지 않음 |

- **논블로킹**: 이전 작업 완료 대기 없이 바로 다음 작업 수행
- **블로킹**: 이전 작업이 끝나야 다음 작업 수행 가능

--- 

### 자바 스크립트 런타임
- 노드는 자바스크립트 런타임이다
- 런타임은 특정 언어로 만든 프로그램을 실행 할 수 있는 환경을 뜻한다.;
- 노드는 자바스크립트 실행기라고 봐도 무방하다.

---

### 이벤트 기반
- 이벤트가 발생할 때 미리 지정해둔 작업을 수행하는 방식을 의미한다.
- 이벤트로는 클릭이나 네트워크  요청 등이 있을 수 있다.
- 이벤트 기반 시스템에서는 특정 이번트가 발생할 떄 무엇을 할지 미리 등록 해둬야 한다. 이를 **이벤트 리스터**에 **콜백**함수를 등록한다고 표현한다.
ex) 클릭 이벤트 리스너에 경고창을 띄우는 골백 함수를 등록해두면 클릭 이벤트가 발생할 때마다 콜백 함수가 실행돼 경고 창이 뜬다.

---

### 이벤트 루프
- 이벤트가 동시에 발생했을 때 어떤 순서로 콜백 함수를 호출할지를 이벤트 루프가 판단한다. 
- 노드는 자바스크립트 코드의 맨 위부터 한 줄씩 실행한다. 
- 함수를 호출 부분을 발견했다면 호출한 함수를 호출 스택에 넣는다.

---

## 스레드와 프로세스

### 싱글 스레드
- 노드는 하나의 스레드로 요청 처리
- 요청 → 처리 → 응답까지 한 스레드가 담당
- 동시 처리는 **비동기 + 이벤트 루프**로 해결

### 멀티 스레드
- 하나의 프로세스에서 여러 스레드 사용
- CPU 연산이 많은 경우 유리
- 스레드 동기화 이슈로 코딩 난이도 상승

### 멀티 프로세싱
- 독립적인 프로세스 여러 개 사용
- 각 프로세스는 메모리 공유 X
- 입출력 요청 많을 때 유리
- 동기화 이슈 적어 상대적으로 구현 쉬움

| 구분 | 설명 |
|---|---|
| **프로세스** | 운영체제 작업 단위. 메모리 공유 X |
| **스레드** | 프로세스 내 실행 흐름 단위. 메모리 공유 O |

---

## 서버로서의 Node.js

| 장점 | 설명 |
|---|---|
| 빠른 응답 | 실시간 채팅, 알림 서비스 적합 |
| 비동기 처리 | DB 조회, 파일 읽기 등에 강함 |

| 단점 | 설명 |
|---|---|
| CPU 연산 많을 때 | 이미지 변환, 대용량 데이터 가공 등 비효율적 |

---

## 변수 선언
| 키워드 | 특징 | 설명 |
|---|---|---|
| var | 함수 스코프 | 재선언 가능 / 호이스팅 문제 / 지양 |
| let | 블록 스코프 | 재할당 가능 |
| const | 블록 스코프 | 재할당 불가 / 기본값으로 사용 |

```javascript
var string1 = num1 + ' 더하기 ' + num2 + '는 \'' + result + '\'';
const string2 = `${num3} 더하기 ${num4}는 '${result2}'`;
```
---

## 함수 호이스팅

### 선언적 함수 - 호이스팅 O
```javascript
hello();

function hello() {
  console.log('Hello!');
}
```
### 함수 표현식 - 호이스팅 X (에러 발생)
```javascript

hello(); // TypeError

var hello = function() {
  console.log('Hello!');
};
```
---
</details>

<details>
<summary><strong>2. 콜백 함수</strong></summary>

### this와 콜백 함수에서의 우회
```javascript
var relationship1 = {
  name: 'zero',
  friends: ['nero', 'hero', 'xero'],
  logFriends: function () {
    var that = this;  // this 저장
    this.friends.forEach(function (friend) {
      console.log(that.name, friend);  // that으로 this 접근
    });
  },
};
relationship1.logFriends();
```

- this는 바로 앞 객체를 가리킴
- forEach 내부에서는 this가 달라지므로 that에 this를 저장해 해결
---

### 함수 저장과 호출 차이
```javascript
var candyMachine = {
  status: {
    name: 'node',
    count: 5,
  },
  getCandy: function () {
    this.status.count--;
    return this.status.count;
  },
};
var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count;

console.log(getCandy); // 함수 자체 출력
console.log(count); // 5 출력

• getCandy: 함수 저장 (호출 아님)
• count: 값 직접 접근
```
---
### 클래스와 상속
```javascript
class Human {
  constructor(type = 'human') {
    this.type = type;
  }

  static isHuman(human) {
    return human instanceof Human;
  }

  static breathe() {
    alert('h-a-a-a-m');
  }
}

class Zero extends Human {
  constructor(type, firstName, lastName) {
    super(type);
    this.firstName = firstName;
    this.lastName = lastName;
  }

  sayName() {
    super.breathe();
    alert(`${this.firstName} ${this.lastName}`);
  }
}

const newZero = new Zero('human', 'Zero', 'Cho');
console.log(Human.isHuman(newZero)) // true
console.log(Human.breathe())
// console.log(newZero.sayName())
```
- super(): 부모 클래스 생성자 호출
- static: 클래스 메서드로 인스턴스 없이 호출 가능
- instanceof: 클래스 인스턴스 여부 확인
---
</details>

<details>
<summary><strong>3. 노드 기능 알아보기</strong></summary>

#### URL
- url 처리에는 크 두지 방식이 있다
하는 노드 버전 7에서 추된 WHATWG(웹 표준을 정하는 단체의 이름) 방식의 url이고, 다른 하나는 예전부터 노드에서 사용하던 url방식 요즘은 WHATWG만 사용
- url.format(객체): 분해되었다면 url 객체를 다시 원래 상태로 조립합니다.
- getAll(키): 키에 해당하는 모든 키 값을 가져옴
- get(키): 키에 해당하는 첫번째 값만 가져옴
- has(키): 해당 키가 있는지 없는지 검사함
- keys(키): searchParams의 모든 값을 반복기 객체로 가져옵니다.
- append(키, 값): 해당 키를 추가 합니다. 같은 키의 값이 있다면 유지하고 하나 더 추가 합니다.
- set(키, 값): append와 비슷하지만 같은 키의 값들을모두 지우고 새로 추가합니다.
- delete(키): 해당 키를 제거 합니다
- toString(): 조작한 searchParams 객체를 다시 문자열로 만든다. 이 문자열을 search에 대입하면 주소 객체에 반영

---

## DNS
- 주로 도메인을 통해 IP나 키타 DNS 정보를 얻고자 할 때 사용합니다.

## crypto
**단반향 암호화**
- 단방향 암호화란 복호화 할 수 없는 암호화 방식을 뜻합니다. 복호화는 암호화된 문자열을 원래 문자열로 되돌려 놓는 것을 의미합니다. 즉, 단방향 암호화는 한번 암호화화면 원래 문자열을 찾을 수 없습니다. 복호화 할 수 없으므로 암호화라고 표현하는 대신 **해시 함수** 라고 부리기도함

```javascript
const crypto = require('crypto');

console.log('base64:', crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex:', crypto.createHash('sha512').update('비밀번호').digest('hex'));
console.log('base64:', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));
```
- createHash: 사용할 해쉬 알고리즘을 넣음
- update(문자열): 변환할 문자열을 넣습니다. 
- digest(인코딩): 인코딩할 알고리즘을 넣습니다.

- 현재는 주로 pdkdf2, bcrypt, scrypt라는 알고리즘으로 비밀번호를 암호화 한다. 노드에서는 pbkdf2를 자주 씀
pbkdf2는 간단히 말하면 기존 문자열에 salt라고 불리는 문자열을 붙인 후 해시 알고리즘을 반복해서 적용한다.

```javascript
const crypto = require('crypto');

crypto.randomBytes(64, (err, buf) => { //64바이트 길이의 랜덤한 문자열 생성 후 콜백함수 실행
  const salt = buf.toString('base64'); //base64로 인코딩
  console.log('salt:', salt);//salt값 출력
  crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => { //비밀번호, salt, 반복횟수, 출력바이트, 해시 알고리즘
    console.log('password:', key.toString('base64'));//비밀번호 출력
  });
});
```
- randomByte() 메서드로 64바이트 길이의 문자열을 만듭니다. 이것이 salt가 된다. 
pbkdf2() 메서드에는 순서대로 비밀번호, salt, 반복 횟수, 출력 바이트 해시 알고리즘을 인수로 넣는다.
예시에서는 10만번 반복해서 적용한다.

---

## 양방향 암호화
- 암호화된 문자열을 복호화 할 수 있으며, 키라는 것이 사용된다.
```javascript
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
```
---

## utill
- 유틸이라는 이름 처럼 각종 편의 기능을 모아둔 모듈. 계속 해서 API가 추가 되고 있으며, 가끔 deprecated되어 사아지는 경우도 있습니다.
- deprecated란 프로그래밍 용어로 중요도가 떨어져 더 이상 사용되지 않고 앞으로는 사라지게 될 것이라는 뜻
새로운 기능이 나와서 기존 기능보다 더 좋을때, 기존 기능을 디프리케이티드가 처리하곤 한다.
이전 사용자를 위해 기능을 제거하지는 않지만 곧 없앨 예정이므로 더 이상 사용하지 말라는 의미.

## worker_threads.js

`worker_threads` 모듈은 Node.js에서 멀티 스레딩을 지원하기 위해 사용됩니다. 이는 CPU 집약적인 작업을 메인 스레드와 분리하여 실행할 수 있게 해주어, 메인 스레드가 블로킹되지 않고 다른 작업을 계속 처리할 수 있도록 합니다. 이를 통해 Node.js 애플리케이션의 성능과 응답성을 향상시킬 수 있습니다.

첫 번째 코드 블록에서는 단일 워커 스레드를 생성하여 메인 스레드와 통신하는 예제를 보여줍니다. 메인 스레드는 워커 스레드를 생성하고, 워커 스레드로부터 메시지를 받거나 워커 스레드가 종료될 때 로그를 출력합니다. 워커 스레드는 메인 스레드로부터 메시지를 받고, 응답 메시지를 보낸 후 종료됩니다. 이 예제는 기본적인 메인 스레드와 워커 스레드 간의 메시지 통신을 이해하는 데 도움이 됩니다.

두 번째 코드 블록에서는 여러 워커 스레드를 생성하고 관리하는 예제를 보여줍니다. 메인 스레드는 `Set` 객체를 사용하여 여러 워커 스레드를 생성하고 관리합니다. 각 워커 스레드는 `workerData`를 통해 초기 데이터를 받아 작업을 수행합니다. 메인 스레드는 각 워커 스레드로부터 메시지를 받고, 모든 워커 스레드가 종료되면 'job done' 메시지를 출력합니다. 이 예제는 여러 워커 스레드를 효율적으로 관리하고, 각 워커 스레드가 독립적으로 작업을 수행하는 방법을 이해하는 데 도움이 됩니다.

이러한 `worker_threads` 모듈을 사용하면 Node.js 애플리케이션에서 멀티 스레딩을 구현하여 CPU 집약적인 작업을 효율적으로 처리할 수 있습니다. 이를 통해 애플리케이션의 성능을 최적화하고, 메인 스레드의 응답성을 유지할 수 있습니다.

```javascript
const {
  Worker, isMainThread, parentPort,
} = require('worker_threads');

if (isMainThread) { // 부모일 때 (메인 스레드)
  const worker = new Worker(__filename);
  worker.on('message', message => console.log('from worker', message));
  worker.on('exit', () => console.log('worker exit'));
  worker.postMessage('ping');
} else { // 워커일 때
  parentPort.on('message', (value) => {
    console.log('from parent', value);
    parentPort.postMessage('pong');
    parentPort.close();
  });
}
```

```javascript
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
```
---

## child_process
- 노드에서 다른 프로그램을 실행하고 싶거나 명령어를 수행하고 싶을 떄 사용하는 모듈.
이 모듈을 통해 다른 언어의 코드(예를 들면, 파이썬)를 실행하고 결과값을 받을 수 있습니다. 이름이 child_process(자식프로세스)인 이유는 현재 노드 프로세스 외에 새로운 프로세스를 띄워서 명령어를 수행하고 노드 프로세스에 결과를 알려 주기 떄문이다.
```javascript
const exec = require('child_process').exec;

const process = exec('dir');

process.stdout.on('data', function(data) {
  console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function(data) {
  console.error(data.toString());
}); // 실행 에러1
```
---

## 기타 모듈들
- async_hooks: 비동기 코드의 흐름을 추적할 수 있는 실험적인 모듈입니다.
- dgram: UDP와 관련된 작업을 할 때 사용합니다.
- net: http보아 로우 레벨인 TCP나 IPC 통신을 할 떄 사용합니다.

---
</details>


<details>
<summary><strong>4. 파일 시스템 접근하기 </strong></summary>

### 파일 시스템 접근하기
- fs 모듈은 파일 시스템에 접근하는 모듈 입니다. 즉 파일을 생성하거나 삭제하고, 읽거나 쓸 수 있습니다. 또한, 폴더도 만들거나 지울 수 있습니다. 웹 브라우저에서 자바스크립트를 사용할 때는 일부를 제외하고는 파일 시스템 접근이 금지되어 있으므로 노드 fs 모듈이 낯설 것이다.
```javascript
const fs = require('fs'); // 파일 시스템 모듈

fs.readFile('./readme.txt', (err, data) => { // 파일 읽기 메서드 readFile (비동기) / readFileSync (동기) 
  if (err) {  // 에러 발생 시 에러 로그 출력
    throw err;
  }
  console.log(data); // 파일 내용 출력 buffer 라는 이상한 것이 출력이 됨
  console.log(data.toString());// 파일 내용을 문자열로 출력 toString()을 이용해서 문자열로 출력 시킨다.
});

// 프로미스 버전
const fs = require('fs').promises; // 파일 시스템 모듈

fs.readFile('./readme.txt') // 파일 읽기 메서드 readFile 
  .then((data) => { // 성공 시 data 출력 / 실패 시 에러 출력
    console.log(data);
    console.log(data.toString()); // 파일 내용을 문자열로 출력
  })
  .catch((err) => {
    console.error(err);
  });

```
- readFile의 결과물은 **버퍼**라는 형식으로 제공된다. 버퍼는 사람이 읽을 수 있는 형식이 아니므로 **toString()**을 사용해 문자열로 변환했습니다.

```javascript
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
```
---

### 동기 메서드와 비공기 메서드
- setTimeout 같은 타이머와 process.nextTick 외에도, 노드는 대부분의 메서드를 비동기 방식으로 처리한다. 하지만 몇몇 메서드는 동기 방식으로도 사용할 수 있다. 특히 fs 모듈이 그러한 메서드를 많이 갖고 있다. 
```javascript
const fs = require('fs');

console.log('시작');
fs.readFile('./readme2.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('1번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('2번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('3번', data.toString());
});
console.log('끝');
// 비동기
const fs = require('fs');

console.log('시작');
let data = fs.readFileSync('./readme2.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('3번', data.toString());
console.log('끝');
```

## Sync 메서드의 문제점 정리

### 개념
`readFileSync` 같은 **Sync(동기) 메서드**는 코드 흐름을 이해하기는 쉽지만,  
**성능 측면에서 치명적인 단점**이 있습니다.

---

### 문제점 요약
- Sync 메서드는 **이전 작업이 끝나야만 다음 작업 진행** 가능
- 파일을 읽는 동안 메인 스레드는 대기 상태 (아무 일도 못함)
- 특히, 요청이 수백 개 이상 몰릴 경우 심각한 성능 저하 발생

---

### 비효율적인 이유
| 구분 | 설명 |
|---|---|
| 백그라운드 작업 | 파일 읽기 같은 I/O 작업은 보통 백그라운드에서 수행 |
| 메인 스레드 | 다음 작업을 못하고 백그라운드 작업 완료만 기다림 |
| 결과 | 메인 스레드가 놀고 있는 비효율 발생 (리소스 낭비) |

---

### 요점 정리
| 구분 | 동기(Sync) | 비동기(Async) |
|---|---|---|
| 작업 방식 | 완료될 때까지 대기 | 대기하지 않고 다음 작업 진행 |
| 성능 | 요청 몰릴 때 성능 저하 | 효율적으로 처리 가능 |
| 코드 난이도 | 쉬움 | 상대적으로 어려움 |
| 추천 상황 | 테스트/간단한 스크립트 | 실무 서비스/서버 개발 |

---

### 결론
> Sync 메서드는 흐름은 단순해서 배우기 쉽지만,  
> 실무 서비스에서는 성능 문제 때문에 거의 쓰지 않는다.  
> **Node.js의 강점은 비동기 처리이므로, 실무에서는 반드시 비동기 방식**을 추천!

---

### 추천 방법
| 상황 | 추천 메서드 |
|---|---|
| 파일 읽기 | `fs.readFile` (비동기) |
| DB 조회 | 비동기 쿼리 사용 |
| 네트워크 요청 | `axios`, `fetch` 등 비동기 요청 |

---

```javascript
const fs = require('fs').promises;

console.log('시작');

// readFile 메서드를 사용하여 'readme2.txt' 파일을 비동기적으로 읽음
fs.readFile('./readme2.txt')
  .then((data) => {
    // 첫 번째 파일 읽기가 완료되면 실행됨
    console.log('1번', data.toString());
    // 두 번째 파일 읽기를 시작하고, 그 결과를 다음 then 블록으로 전달
    return fs.readFile('./readme2.txt');
  })
  .then((data) => {
    // 두 번째 파일 읽기가 완료되면 실행됨
    console.log('2번', data.toString());
    // 세 번째 파일 읽기를 시작하고, 그 결과를 다음 then 블록으로 전달
    return fs.readFile('./readme2.txt');
  })
  .then((data) => {
    // 세 번째 파일 읽기가 완료되면 실행됨
    console.log('3번', data.toString());
    console.log('끝');
  })
  .catch((err) => {
    // 파일 읽기 중 에러가 발생하면 실행됨
    console.error(err);
  });
  ```
  ---

## 버퍼와 스트림 이해하기

### 버퍼(Buffer)란?
- **버퍼링**: 영상을 재생할 수 있을 만큼 데이터를 **모아두는 동작**
- 노드에서 파일을 읽을 때, 파일 크기만큼 메모리를 확보하고 데이터를 저장하는데,  
  이 저장된 데이터 덩어리가 **버퍼**다.

### 스트림(Stream)이란?
- 데이터를 **조각조각 나눠서 전송**하는 방식
- 예) 라이브 방송에서 방송인의 컴퓨터에서 시청자에게 영상 데이터를 실시간으로 전송하는 것

### 버퍼링 vs 스트리밍 비교
| 구분 | 설명 |
|---|---|
| 버퍼링 | 재생 전 데이터를 미리 모아둠 |
| 스트리밍 | 데이터를 실시간으로 조금씩 전송 |
| 관계 | 스트리밍 중에도 네트워크 속도가 느리면 버퍼링 발생 가능 |

---

###  노드에서의 버퍼와 스트림
| 작업 | 설명 |
|---|---|
| 파일 읽기 (`readFile`) | 파일 전체를 버퍼로 읽어 메모리에 저장 |
| 파일 스트리밍 (`createReadStream`) | 파일을 **조각** 단위로 읽어서 바로 처리 가능 |

---

### 스트림의 핵심 개념: 파이핑(Piping)
- 스트림끼리 연결하는 작업을 **파이핑**이라고 함
- 예) 파일을 읽는 스트림과 쓰는 스트림을 연결하면:
    - 읽으면서 바로 씀 (메모리 절약 + 빠른 처리)


```javascript
const fs = require('fs');

const readStream = fs.createReadStream('readme4.txt'); // 파일을 읽어오는 스트림 생성
const writeStream = fs.createWriteStream('writeme3.txt'); // 파일을 쓰는 스트림 생성
readStream.pipe(writeStream); // 파이핑

const zlibStream = zlib.createGzip(); // zlib 스트림 생성
```
- zlibStream: zlib 모듈도 제공하여 버퍼 데이터가 전달되다가 gzip 압축을 거친 후 압축 파일을 생성한다.
---

### 기타 fs 메서드 알아보기
```javascript
const fs = require('fs');
//fs.access(경로, 옵션, 콜백)
fs.access('./folder', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => { // 폴더나 파일에 접근할 수 있는지 체크
  if (err) {
    if (err.code === 'ENOENT') {
      console.log('폴더 없음');
      //fs.mkdir (경로, 콜백)
      fs.mkdir('./folder', (err) => {  // 폴더 생성
        if (err) {
          throw err;
        }
        console.log('폴더 만들기 성공');
        //fs.open(경로, 옵션, 콜백)
        fs.open('./folder/file.js', 'w', (err, fd) => { // 파일 생성
          if (err) {
            throw err;
          }
          console.log('빈 파일 만들기 성공', fd);
          //fs.rename(기존 경로, 새 경로, 콜백)
          fs.rename('./folder/file.js', './folder/newfile.js', (err) => { //  파일 이름 바꾸기
            if (err) {
              throw err;
            }
            console.log('이름 바꾸기 성공');
          });
        });
      });
    } else {
      throw err;
    }
  } else {
    console.log('이미 폴더 있음');
  }
});

// 프로미스 버전

const fs = require('fs').promises;
const constants = require('fs').constants;

fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK)
  .then(() => {
    return Promise.reject('이미 폴더 있음');
  })
  .catch((err) => {
    if (err.code === 'ENOENT') {
      console.log('폴더 없음');
      return fs.mkdir('./folder');
    }
    return Promise.reject(err);
  })
  .then(() => {
    console.log('폴더 만들기 성공');
    return fs.open('./folder/file.js', 'w');
  })
  .then((fd) => {
    console.log('빈 파일 만들기 성공', fd);
    return fs.rename('./folder/file.js', './folder/newfile.js');
  })
  .then(() => {
    console.log('이름 바꾸기 성공');
  })
  .catch((err) => {
    console.error(err);
  });

```
---

### 스레드 풀(Thread Pool) 정리

#### 개념
- Node.js의 **fs 모듈 비동기 메서드**들은 실제로 **백그라운드에서 실행**됨
- 백그라운드에서 작업한 후, 완료되면 메인 스레드에서 **콜백 함수**나 **프로미스의 then**을 실행

#### 핵심 포인트
- Node.js는 싱글 스레드지만, **백그라운드 작업은 스레드 풀**에서 처리
- **fs, crypto, zlib 같은 일부 모듈들은 내부적으로 스레드 풀을 사용**
- 덕분에 **여러 비동기 작업을 동시에 처리 가능**

#### 스레드 풀 흐름 정리
| 단계 | 설명 |
|---|---|
| 1 | fs 비동기 메서드 호출 |
| 2 | 백그라운드에서 스레드 풀에 작업 요청 |
| 3 | 스레드 풀에서 여러 작업을 동시에 수행 |
| 4 | 작업 완료 후, 메인 스레드로 결과 전달 (콜백 or then 실행) |

####  요점 정리
| 구분 | 설명 |
|---|---|
| 메인 스레드 | 요청 받고 응답하는 역할 (이벤트 루프 담당) |
| 스레드 풀 | 무거운 I/O 작업 처리 담당 |
| 지원 모듈 | fs, crypto, zlib 등 |
| 동시 처리 | 여러 작업을 동시에 백그라운드에서 처리 가능 |

#### 결론
> **Node.js는 메인 스레드는 하나지만, 백그라운드에서 스레드 풀이 여러 작업을 병렬로 처리하는 구조 덕분에 성능이 좋아진다.**

---

```javascript
const crypto = require('crypto');

const pass = 'pass'; // 비밀번호
const salt = 'salt'; // 솔트 값
const start = Date.now(); // 시작 시간 기록

// 첫 번째 비동기 pbkdf2 함수 호출
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('1:', Date.now() - start); // 작업 완료 시간 출력
});

// 두 번째 비동기 pbkdf2 함수 호출
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('2:', Date.now() - start); // 작업 완료 시간 출력
});

// 세 번째 비동기 pbkdf2 함수 호출
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('3:', Date.now() - start); // 작업 완료 시간 출력
});

// 네 번째 비동기 pbkdf2 함수 호출
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('4:', Date.now() - start); // 작업 완료 시간 출력
});

// 다섯 번째 비동기 pbkdf2 함수 호출
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('5:', Date.now() - start); // 작업 완료 시간 출력
});

// 여섯 번째 비동기 pbkdf2 함수 호출
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('6:', Date.now() - start); // 작업 완료 시간 출력
});

// 일곱 번째 비동기 pbkdf2 함수 호출
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('7:', Date.now() - start); // 작업 완료 시간 출력
});

// 여덟 번째 비동기 pbkdf2 함수 호출
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('8:', Date.now() - start); // 작업 완료 시간 출력
});
```
- UV_THREADPOOL_SIZE=1 이렇게 입력하면 순서대로 실행 됌

---
</details>

<details>
<summary><strong>5. http 모듈 서버 만들기 </strong></summary>

- 요청(Request): 클라이언트 -> 서버로 보내는 데이터 (ex. GET, POST 방식과 URL 정보 포함)
- 응답(Response): 서버 -> 클라이언트로 보내는 데이터(ex. HTML, JSON, 상태 코드 등)


```javascript
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
```
---

### REST & REST API 개념 정리

#### REST란?
- **REST (REpresentational State Transfer)**  
  - 서버의 자원을 정의하고, **자원에 대한 주소(URL)를 지정하는 방법**
  - 특정한 **약속**을 정해서, API를 일관된 방식으로 설계하는 방식

---

#### REST API 기본 규칙
 **자원(Resource)**  
   - 자원은 꼭 파일이 아니라, **서버가 제공하는 모든 데이터**를 의미
   - 예) 사용자 정보, 게시글, 댓글 등

 **RESTful URL**  
   - 주소(URL)는 의미를 명확히 전달하기 위해 **명사로 구성**
   - 예)
     - `/user` → 사용자 정보 관련 API
     - `/post` → 게시글 정보 관련 API

 **HTTP 요청 메서드**  
   - REST API에서는 **HTTP 메서드를 사용하여 행동을 표현**

---

#### RESTful API - HTTP 요청 메서드 정리

| 메서드 | 설명 | 데이터 포함 여부 |
|---|---|---|
| **GET** | 서버에서 자원을 조회 | ❌ (쿼리스트링 사용) |
| **POST** | 새로운 자원 생성 | ✅ 요청 본문(body)에 포함 |
| **PUT** | 기존 자원 전체 교체 | ✅ 요청 본문(body)에 포함 |
| **PATCH** | 기존 자원의 일부 수정 | ✅ 요청 본문(body)에 포함 |
| **DELETE** | 자원 삭제 | ❌ |
| **OPTIONS** | 요청 전에 통신 옵션 확인 | ❌ |

---

#### HTTP 요청 예시
| 요청 방식 | URL |
|---|---|---|
| `GET /user` | `/user` 자원의 데이터를 가져옴 (사용자 정보 조회) |
| `POST /user` | `/user` 자원에 새로운 사용자 추가 |
| `PUT /user/1` | `/user/1` 자원을 새로운 데이터로 **전체 변경** |
| `PATCH /user/1` | `/user/1` 자원의 일부만 변경 |
| `DELETE /user/1` | `/user/1` 자원을 삭제 |

---

#### RESTful API 설계 원칙
✔️ **URL은 명사를 사용해야 함** (`/getUser ❌ → /user

---

### https와 http2

##  https란?
`https` 모듈은 웹 서버에 **SSL 암호화**를 추가합니다.  
클라이언트가 서버에 GET이나 POST 요청을 보낼 때, 오가는 데이터를 암호화하여  
**중간에서 데이터가 가로채여도 내용을 확인할 수 없게 보호**하는 역할을 합니다.

---
### 쿠키와 세션
- 쿠키(Cookie)
- 클라이언트에 저장되는 데이터
-  서버가 응답시 `Set-Cookie`라는 헤더에 쿠키 정보를 담아 전송
-  이후 클라이언트는 같은 서버로 요청할 때마다 쿠키를 자동으로 요청 헤더(`cookie`)에 포함해 전송
-  **Key-Value** 형태로 저장(예:`name=sewon`)

- 세션(Session)
- 서버에 저장되는 데이터
- 클라이언트는 세션의 고유 식별자(`Session ID`)만 쿠키에 저장
- 세션 ID를 통해 서버에 해당 사용자에 데이터(세션 정보)를 조회
  
#### 쿠키 예제(단순 쿠키 설정)
- 클라이언트가 요청할 때마다 서버는 `req.headers.cookie`에서 쿠키를 확인하고 출력
- 응답 헤더에 `Set-Cookie`를 추가해 쿠키를 클라이언트에 저장
- 이후 클라이언트는 저장된 쿠키를 요청마다 함께 보내게 됌
```javascript
const http = require('http'); http.createServer((req, res) => {
  console.log(req.url, req.headers.cookie); //요청에 포함된 쿠키 출력
  res.writeHead(200, { 'Set-Cookie': 'mycookie=test' }); // Set-Cookie 응답 헤더
  res.end('Hello Cookie'); 
})

  .listen(8083, () ⇒ {
    console.log("8083번 포트에서 서버 대기 중 입니다.!");
  });
```
#### `parseCookies` 함수


### http 서버 예제
```javascript
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
.listen(8080, () => { 
  console.log('8080번 포트에서 서버 대기 중입니다!');
});
```
	•	http 모듈: 일반적인 **HTTP 서버 (80/8080 포트)**용
	•	http.createServer: 서버 생성
	•	req: 요청 객체
	•	res: 응답 객체
	•	res.writeHead: 응답 헤더 설정
	•	res.write, res.end: 응답 본문 작성
	•	포트번호: 8080 (주로 개발용)

###  https 서버 예제
```javascript
const https = require('https');
const fs = require('fs');

https.createServer({
  cert: fs.readFileSync('도메인 인증서 경로'),
  key: fs.readFileSync('도메인 비밀키 경로'),
  ca: [
    fs.readFileSync('상위 인증서 경로'),
    fs.readFileSync('상위 인증서 경로'),
  ],
}, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
.listen(443, () => {
  console.log('443번 포트에서 서버 대기 중입니다!');
});
```

	•	https 모듈: **SSL 인증서를 사용하는 보안 서버 (443 포트)**용
	•	https.createServer: 보안 서버 생성
	•	인증서 관련 설정 필요:
	•	cert: 서버 인증서 파일
	•	key: 서버 비밀키 파일
	•	ca: 상위 인증기관 체인 인증서
	•	포트번호: 443 (https 기본 포트)


### http2 서버 예제
```javascript
const http2 = require('http2');
const fs = require('fs');

http2.createSecureServer({
  cert: fs.readFileSync('도메인 인증서 경로'),
  key: fs.readFileSync('도메인 비밀키 경로'),
  ca: [
    fs.readFileSync('상위 인증서 경로'),
    fs.readFileSync('상위 인증서 경로'),
  ],
}, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
.listen(443, () => {
  console.log('443번 포트에서 서버 대기 중입니다!');
});
```

	•	http2 모듈: 최신 프로토콜인 HTTP/2 지원 서버 (빠른 속도 + 멀티플렉싱)
	•	인증서 설정은 https와 거의 동일
	•	포트번호: 443 (https와 같지만, 프로토콜이 다름)


### HTTP/1.1 특징
| 항목 | 설명 |
|---|---|
| 요청 처리 방식 | **직렬 처리 (Sequential Processing)** |
| 요청 개수 | **한 번에 하나만 요청 가능** |
| 연결 방식 | 요청마다 새로운 연결을 맺거나, `keep-alive`로 재사용 |
| 성능 | 여러 요청을 처리할 때 병목 현상 발생 가능 (Head-of-line Blocking) |
| 헤더 | 요청마다 동일한 헤더 계속 전송 (비효율적) |

---

### HTTP/2 특징
| 항목 | 설명 |
|---|---|
| 요청 처리 방식 | **병렬 처리 (Multiplexing)** |
| 요청 개수 | **한 번에 여러 요청 동시 처리 가능** |
| 연결 방식 | 하나의 연결로 여러 스트림 처리 (Connection Reuse) |
| 성능 | 더 빠른 응답과 효율적인 리소스 전송 |
| 헤더 | **헤더 압축 (HPACK)**으로 중복 제거 및 전송 최적화 |

---

### 한눈에 비교표
| 구분 | HTTP/1.1 | HTTP/2 |
|---|---|---|
| 요청 방식 | 하나씩 순서대로 | 동시에 여러 요청 가능 |
| 연결 재사용 | 가능 (keep-alive) | 하나의 연결에서 여러 스트림 동시 처리 |
| 성능 | 병목 발생 가능 | 훨씬 빠르고 효율적 |
| 헤더 관리 | 요청마다 중복 전송 | HPACK으로 헤더 압축 |
| 지원 현황 | 현재도 많이 사용 | 최신 서비스들은 적극 사용 중 |

---

### Node.js와 HTTP/2
- Node.js에서는 `http2` 모듈이 HTTP/2를 지원
- 기존 `https`는 HTTP/1.1 기반 보안 서버
- `http2`는 **SSL 필수 + 최신 프로토콜 적용**이라는 차이점

---

### 요점 정리
| 프로토콜 | 설명 |
|---|---|
| `http` | 암호화 없는 일반 서버 (HTTP/1.1) |
| `https` | 암호화된 보안 서버 (HTTP/1.1) |
| `http2` | 암호화 + 병렬 처리되는 최신 HTTP/2 서버 |

---

### 비유로 이해하기
| 구분 | 비유 |
|---|---|
| HTTP/1.1 | 편의점에서 물건 하나씩 따로 계산 |
| HTTP/2 | 장바구니에 물건 한꺼번에 담고 계산 (병렬 처리) |

---

### 핵심 요약
**HTTP/2는 요청과 응답을 더 효율적으로 관리하여, 기존 HTTP/1.1보다 훨씬 빠르고 최적화된 최신 프로토콜이다. Node.js에서는 `http2` 모듈로 쉽게 구현 가능하며, SSL은 필수이다.**

---

#### cluster
- 기본적으로 싱글 프로세스로 동작하는 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈.
- 포트를 공유하는 노드 프로세스를 여러 개 둘 수도 있어, 요청이 많이 들어왔을 때 병렬로 실행된 서버의 개수만큼 요청이 분산되게 할 수 있다.
---

</details>

<details>
<summary><strong>6. 익스프레스 웹 서버</strong></summary>

### Express 미들웨어 & Multer 정리

아래는 미들웨어와 Multer에 대한 개념과 설명을
깔끔하게 마크다운으로 정리한 버전이야.
바로 복사해서 README.md나 노트 정리할 때 써도 돼.

---

### 미들웨어 (Middleware)

#### 미들웨어란?
- **요청(Request)과 응답(Response) 사이에서 동작하는 함수**.
- 요청을 가로채 필요한 작업을 수행하고, 다음 미들웨어로 넘기거나 응답을 보냄.

---

#### 미들웨어 함수 구조
```javascript
function middleware(req, res, next) {
    // 요청과 응답 사이에서 할 일 처리
    next(); // 다음 미들웨어로 넘어가기
}
```

#### 미들웨어 종류

| 종류 | 설명 | 예시 |
|---|---|---|
| 전역 미들웨어 | 모든 요청에 실행 | `app.use()` |
| 라우터 미들웨어 | 특정 경로에서만 실행 | `app.get('/path', 미들웨어)` |
| 에러 처리 미들웨어 | 에러 발생 시 실행 | `app.use((err, req, res, next) => {...})` |


#### 주요 미들웨어 예시

| 미들웨어 | 설명 |
|---|---|
| morgan | 요청 로그 출력 |
| express.json() | JSON 본문 파싱 |
| express.urlencoded() | Form 데이터 파싱 |
| cookie-parser | 쿠키 파싱 |
| express.static() | 정적 파일 제공 |
| multer | 파일 업로드 처리 |

---

### 미들웨어 종류

| 종류 | 설명 | 예시 |
|---|---|---|
| 전역 미들웨어 | 모든 요청에 실행 | `app.use()` |
| 라우터 미들웨어 | 특정 경로에서만 실행 | `app.get('/path', 미들웨어)` |
| 에러 처리 미들웨어 | 에러 발생 시 실행 | `app.use((err, req, res, next) => {...})` |

---

#### 미들웨어 동작 흐름

요청 → 전역 미들웨어 → 라우터 미들웨어 → 응답
↑
에러 발생 시 에러 처리 미들웨어 호출

---

#### 주요 미들웨어 예시

| 미들웨어 | 설명 |
|---|---|
| morgan | 요청 로그 출력 |
| express.json() | JSON 본문 파싱 |
| express.urlencoded() | Form 데이터 파싱 |
| cookie-parser | 쿠키 파싱 |
| express.static() | 정적 파일 제공 |
| multer | 파일 업로드 처리 |

---

### Multer (파일 업로드 미들웨어)

####  Multer란?
- Express 전용 파일 업로드 미들웨어
- 요청 본문에 포함된 파일 데이터를 해석하고, 지정된 경로에 저장

---

####  기본 사용법
```javascript
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file); // 업로드된 파일 정보
    res.send('업로드 완료');
});
```

---

#### 저장 방식 설정 (diskStorage)
	•	파일명, 저장 폴더 직접 제어 가능
```javascript

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // 파일명: 현재시간 + 확장자
    }
});
const upload = multer({ storage });
```
---

####  Multer 주요 메서드

| 메서드 | 설명 | 저장 위치 |
|---|---|---|
| single() | 한 개 파일 업로드 | req.file |
| array() | 여러 개 파일 (같은 name) | req.files |
| fields() | 여러 개 파일 (다른 name) | req.files.필드명 |
| none() | 파일 없이 데이터만 받기 | req.body |

---

####  Multer 흐름 요약

| 단계 | 설명 |
|---|---|
| 요청 | 클라이언트가 파일 업로드 요청 전송 |
| multer 처리 | 파일 파싱 후 지정 폴더에 저장 |
| 라우터 처리 | req.file 또는 req.files에서 파일 정보 사용 |

---

####  정리 요점

| 구분 | 설명 |
|---|---|
| 미들웨어 | 요청과 응답 사이에서 동작 |
| multer | 파일 업로드 전용 미들웨어 |
| 전역 미들웨어 | 모든 요청에서 동작 |
| 라우터 미들웨어 | 특정 경로에서 동작 |
| 에러 미들웨어 | 에러 발생 시 동작 |

---

#### 결론
	•	미들웨어는 요청과 응답 흐름을 제어하는 필수 구성요소
	•	Multer는 파일 업로드를 다룰 때 필수 미들웨어
	•	파일 저장 방식, 업로드 용량 제한, 업로드 필드명 등을 모두 커스터마이징 가능

---

```javascript
const dotenv = require('dotenv');  // 환경변수 파일(.env)을 로드하는 모듈 불러오기
dotenv.config();                    // .env 파일 읽어서 process.env에 넣기

const express = require('express');  // 익스프레스 모듈 불러오기
const path = require('path');        // 경로 관련 모듈 불러오기
const morgan = require('morgan');    // 요청 로그 남기는 모듈 불러오기
const cookieParser = require('cookie-parser');  // 쿠키 파싱 미들웨어 불러오기
const session = require('express-session');     // 세션 관리 미들웨어 불러오기
const multer = require('multer');    // 파일 업로드 처리 미들웨어 불러오기
const fs = require('fs');            // 파일시스템 모듈 불러오기
const { v4: uuidv4 } = require('uuid');  // uuid 모듈에서 v4 메서드 불러오기 (파일명 랜덤화에 사용)

const app = express();  // 익스프레스 애플리케이션 생성

app.set('port', process.env.PORT || 3000);  // 사용할 포트 설정 (환경변수 없으면 3000 사용)

const upload = multer({  // multer 설정 시작
  storage: multer.diskStorage({  // 파일 저장 방식 설정 (디스크에 저장)
    destination(req, file, done) {  // 저장 경로 설정
      const uploadPath = path.join(__dirname, 'uploads');  // 현재 폴더 밑에 uploads 폴더 지정
      if (!fs.existsSync(uploadPath)) {  // uploads 폴더 없으면 생성
        fs.mkdirSync(uploadPath);
      }
      done(null, uploadPath);  // 실제 저장 경로 지정
    },
    filename(req, file, done) {  // 저장할 파일명 설정
      const ext = path.extname(file.originalname);  // 원본 파일의 확장자 추출
      done(null, `${uuidv4()}${ext}`);  // 파일명은 랜덤 UUID + 원래 확장자
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },  // 파일 크기 제한 (10MB)
});

// 미들웨어 설정
app.use(morgan('dev'));  // 요청 로그 출력 (개발용 설정)
app.use('/', express.static(path.join(__dirname, 'public')));  // 정적 파일 제공(public 폴더)
app.use(express.json());  // 요청 본문(json) 파싱
app.use(express.urlencoded({ extended: false }));  // 요청 본문(form-urlencoded) 파싱
app.use(cookieParser(process.env.COOKIE_SECRET));  // 쿠키 파싱 및 서명 처리
app.use(session({  // 세션 설정
  resave: false,  // 요청이 왔을 때 세션에 수정사항이 없어도 다시 저장할지 여부
  saveUninitialized: false,  // 세션이 필요하기 전까지는 세션을 구동하지 않음
  secret: process.env.COOKIE_SECRET,  // 쿠키 암호화 키 (env에서 불러옴)
  cookie: { 
    httpOnly: true,  // 자바스크립트에서 쿠키 접근 금지
    secure: false,   // https가 아닌 환경에서도 사용
  },
  name: 'session-cookie',  // 세션 쿠키 이름 지정
}));

// 업로드 화면 라우터
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));  // 파일 업로드 폼 제공
});

// 파일 업로드 처리 라우터
app.post('/upload', upload.fields([
  { name: 'image1', maxCount: 1 },  // image1은 1개만
  { name: 'image2', maxCount: 1 },  // image2도 1개만
]), (req, res) => {
  console.log(req.files.image1);  // 업로드된 image1 파일 정보 출력
  console.log(req.files.image2);  // 업로드된 image2 파일 정보 출력
  console.log(req.body.title);    // 함께 전송된 제목 데이터 출력
  res.send('ok');  // 업로드 완료 응답
});

// 모든 요청에서 실행되는 공통 미들웨어
app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다.');  // 모든 요청마다 로그 출력
  next();  // 다음 미들웨어로 이동
});

// 메인 페이지 요청 처리 라우터
app.get('/', (req, res) => {
  console.log('GET / 요청에서만 실행됩니다.');  // 로그 출력
  res.sendFile(path.join(__dirname, 'index.html'));  // 메인 페이지 파일 제공
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err);  // 에러 로그 출력
  res.status(500).send(err.message);  // 500 에러 응답
});

// 서버 실행
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');  // 서버 시작 로그
});
```
---
</details>

<details>
<summary><strong>7. Router 객체로 라우팅 분리하기</strong></summary>

### 시퀄라이즈

- npm i express morgan nunjucks sequelize sequelize-cli mysql2
- npm i -D nodemon
- npx sequelize init

### Learn Sequelize

## 프로젝트 구조
```
learn-sequelize/
├── config/
│   └── config.json : DB 접속 정보
├── migrations/
├── models/
│   ├── index.js : config.json + users.js + comments.js
│   ├── users.js : users 테이블 매핑
│   └── comments.js : comments 테이블 매핑
├── node_modules/
├── public/
│   └── sequelize.js : 프론트 동작 매핑
│       ├── axios.get('/users') : 사용자 리스트
│       ├── axios.get(`/users/${id}/comments`) : 사용자가 입력한 댓글 리스트
│       ├── axios.patch(`/comments/${comment.id}`, { comment: newComment }) : 댓글 수정
│       ├── axios.delete(`/comments/${comment.id}`) : 댓글 삭제
│       └── axios.post('/users', { name, age, married }) : 사용자 등록
│       └── axios.post('/comments', { id, comment }) : 댓글 등록
├── routes/
│   ├── index.js : 
│   │   └── / : User.findAll() : 유저 정보를 모두 가져와서 랜더링
│   ├── users.js : 
│   │   ├── /users : 
│   │   │   ├── GET : User.findAll() : 유저 정보를 모두 가져와서 랜더링
│   │   │   └── POST : User.create() : 유저 정보 입력
│   │   └── /users/:id/comments : 댓글 정보를 모두 가져오면서 사용자 정보도 함께 가져옴
│   │       └── Comment.findAll({
│   │             include: {
│   │               model: User,
│   │               where: { id: req.params.id },
│   │             },
│   │           })
│   ├── comments.js : 
│   │   ├── /comments : Comment.create() : 댓글 입력
│   │   └── /comments/:id : 
│   │       ├── PATCH : Comment.update() : 댓글 수정
│   │       └── DELETE : Comment.destroy() : 댓글 삭제
├── seeders/
├── views/
│   ├── error.html
│   └── sequelize.html
├── app.js
├── package-lock.json
└── package.json
```

## 설치 및 초기화

```sh
npm i express morgan nunjucks sequelize sequelize-cli mysql2
npm i -D nodemon
npx sequelize init
```

## 설명

### config
- `config.json`: 데이터베이스 접속 정보

### models
- `index.js`: config.json + users.js + comments.js
- `users.js`: users 테이블 매핑
- `comments.js`: comments 테이블 매핑

### public
- `sequelize.js`: 프론트 동작 매핑
  - `axios.get('/users')`: 사용자 리스트
  - `axios.get(`/users/${id}/comments`)`: 사용자가 입력한 댓글 리스트
  - `axios.patch(`/comments/${comment.id}`, { comment: newComment })`: 댓글 수정
  - `axios.delete(`/comments/${comment.id}`)`: 댓글 삭제
  - `axios.post('/users', { name, age, married })`: 사용자 등록
  - `axios.post('/comments', { id, comment })`: 댓글 등록

### routes
- `index.js`: 
  - `/`: User.findAll() : 유저 정보를 모두 가져와서 랜더링
- `users.js`: 
  - `/users`: 
    - `GET`: User.findAll() : 유저 정보를 모두 가져와서 랜더링
    - `POST`: User.create() : 유저 정보 입력
  - `/users/:id/comments`: 댓글 정보를 모두 가져오면서 사용자 정보도 함께 가져옴
    - `Comment.findAll({
        include: {
          model: User,
          where: { id: req.params.id },
        },
      })`
- `comments.js`: 
  - `/comments`: Comment.create() : 댓글 입력
  - `/comments/:id`: 
    - `PATCH`: Comment.update() : 댓글 수정
    - `DELETE`: Comment.destroy() : 댓글 삭제

### views
- `error.html`
- `sequelize.html`

### 기타 파일
- `app.js`
- `package-lock.json`
- `package.json`


```javascript
const express = require("express"); // Express 모듈을 가져옴
const cookieParser = require("cookie-parser"); // 쿠키 파싱 미들웨어를 가져옴
const morgan = require("morgan"); // HTTP 요청 로깅 미들웨어를 가져옴
const path = require("path"); // 파일 및 디렉토리 경로 관련 유틸리티를 가져옴
const session = require("express-session"); // 세션 관리 미들웨어를 가져옴
const nunjucks = require("nunjucks"); // 템플릿 엔진 Nunjucks를 가져옴
const dotenv = require("dotenv"); // 환경 변수 관리 모듈을 가져옴

dotenv.config(); // .env 파일에 정의된 환경 변수를 로드
const pageRouter = require("./routes/page"); // 페이지 라우터를 가져옴

const app = express(); // Express 애플리케이션 생성
app.set("port", process.env.PORT || 8001); // 포트 설정, 환경 변수에 PORT가 설정되어 있지 않으면 8001번 포트를 사용
app.set("view engine", "html"); // 뷰 엔진을 'html'로 설정
nunjucks.configure("views", {
  express: app, // Express 애플리케이션을 Nunjucks에 연결
  watch: true, // 템플릿 파일 변경 시 자동으로 다시 로드
});
app.use(morgan("dev")); // HTTP 요청 로깅 미들웨어 설정 (개발 모드)
app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 제공 미들웨어 설정
app.use(express.json()); // JSON 요청 본문을 파싱하는 미들웨어 설정
app.use(express.urlencoded({ extended: false })); // URL-encoded 요청 본문을 파싱하는 미들웨어 설정
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키 파싱 및 서명 처리 미들웨어 설정
app.use(
  session({
    resave: false, // 세션이 수정되지 않아도 다시 저장할지 여부
    saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
    secret: process.env.COOKIE_SECRET, // 세션 암호화에 사용할 비밀 키
    cookie: {
      httpOnly: true, // 클라이언트에서 쿠키를 수정할 수 없도록 설정
    },
  })
);

app.use("/", pageRouter); // 페이지 라우터를 사용하여 루트 경로에 대한 요청을 처리

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`); // 요청한 라우터가 없을 때 에러 생성
  error.status = 404; // 에러 상태 코드를 404로 설정
  next(error); // 다음 미들웨어로 에러 전달
});
```

1. **`express`**: Express 애플리케이션을 생성하고 설정합니다.
2. **`cookieParser`**: 쿠키를 파싱하고 서명 처리하는 미들웨어입니다.
3. **`morgan`**: HTTP 요청을 로깅하는 미들웨어입니다. 개발 모드(`dev`)로 설정되어 있습니다.
4. **`path`**: 파일 및 디렉토리 경로 관련 유틸리티를 제공합니다.
5. **`session`**: 세션을 관리하는 미들웨어입니다. 세션을 암호화하고, 클라이언트에서 수정할 수 없도록 설정합니다.
6. **`nunjucks`**: 템플릿 엔진으로, 템플릿 파일을 렌더링합니다.
7. **`dotenv`**: 환경 변수를 관리하는 모듈로, `.env` 파일에 정의된 환경 변수를 로드합니다.
8. **`pageRouter`**: 페이지 라우터로, 루트 경로(`/`)에 대한 요청을 처리합니다.
9. **`express.static`**: 정적 파일을 제공하는 미들웨어입니다. `public` 디렉토리의 파일을 제공합니다.
10. **`express.json`**: JSON 요청 본문을 파싱하는 미들웨어입니다.
11. **`express.urlencoded`**: URL-encoded 요청 본문을 파싱하는 미들웨어입니다.
12. **`cookieParser`**: 쿠키를 파싱하고 서명 처리하는 미들웨어입니다.
13. **`session`**: 세션을 관리하는 미들웨어입니다.
14. **404 에러 처리 미들웨어**: 요청한 라우터가 없을 때 404 에러를 생성하고 처리합니다.
이 세 개의 파일은 Express 애플리케이션에서 서로 연동되어 동작합니다. 동작 순서는 다음과 같습니다:

1. **서버 시작 (`app.js`)**
   - `app.js` 파일이 실행되면서 Express 애플리케이션이 생성되고 설정됩니다.
   - 포트 설정, 뷰 엔진 설정, 미들웨어 설정 등이 이루어집니다.
   - `app.use("/", pageRouter);`를 통해 루트 경로에 대한 요청을 `pageRouter`로 위임합니다.
   - 서버가 설정된 포트에서 대기 상태로 들어갑니다.

2. **라우터 설정 (`routes/page.js`)**
   - `pageRouter`는 page.js 파일에서 정의된 라우터입니다.
   - 모든 요청에 대해 공통적으로 실행되는 미들웨어가 설정됩니다.
   - 특정 경로 (`/profile`, `/join`, `/`)에 대한 GET 요청이 들어오면 각각 `renderProfile`, `renderJoin`, `renderMain` 함수가 호출됩니다.

3. **컨트롤러 함수 실행 (`controllers/page.js`)**
   - page.js 파일에서 호출된 `renderProfile`, `renderJoin`, `renderMain` 함수는 page.js 파일에서 정의된 함수들입니다.
   - 각 함수는 요청에 따라 적절한 뷰를 렌더링하고 응답을 반환합니다.

### 예시 요청 흐름

1. **클라이언트가 `/profile` 경로로 GET 요청을 보냅니다.**
   - `app.js`에서 이 요청을 `pageRouter`로 위임합니다.
   - page.js에서 `/profile` 경로에 대한 GET 요청을 처리하는 `router.get('/profile', renderProfile);`가 실행됩니다.
   - `renderProfile` 함수가 page.js에서 호출되어 `profile` 뷰를 렌더링하고 응답을 반환합니다.

2. **클라이언트가 `/join` 경로로 GET 요청을 보냅니다.**
   - `app.js`에서 이 요청을 `pageRouter`로 위임합니다.
   - page.js에서 `/join` 경로에 대한 GET 요청을 처리하는 `router.get('/join', renderJoin);`가 실행됩니다.
   - `renderJoin` 함수가 page.js에서 호출되어 `join` 뷰를 렌더링하고 응답을 반환합니다.

3. **클라이언트가 `/` 경로로 GET 요청을 보냅니다.**
   - `app.js`에서 이 요청을 `pageRouter`로 위임합니다.
   - page.js에서 `/` 경로에 대한 GET 요청을 처리하는 `router.get('/', renderMain);`가 실행됩니다.
   - `renderMain` 함수가 page.js에서 호출되어 `main` 뷰를 렌더링하여 응답합니다. 여기서 `twits` 배열은 뷰에 전달됩니다.

따라서, `req`는 클라이언트의 요청 정보를 담고 있고, `res`는 서버의 응답을 구성하여 클라이언트로 보내는 역할을 합니다.

---


# Nodebird 프로젝트 구조

## [config]
- `config.json`: DB 연결정보 (development)

## [controllers]
- `auth.js`: `join`, `login`, `logout`
- `page.js`: `renderProfile`, `renderMain`, `renderJoin`, `renderHashtag`
- `post.js`: `afterUploadImage`, `uploadPost`
- `user.js`: `follow`

## [middlewares]
- `index.js`: `isLoggedIn`, `isNotLoggedIn`

## [migrations]

## [models]
- `index.js`
- `post.js`
- `user.js`
- `hashtag.js`

## [node_modules]

## [passport]
- `index.js`: `passport.serializeUser`, `passport.deserializeUser`
- `localStrategy.js`: `passport.use`
- `kakaoStrategy.js`: `passport.use`

## [public]
- `main.css`

## [routes]
- `auth.js`
  - `POST /auth/join`: `isNotLoggedIn`, `join`
  - `POST /auth/login`: `isNotLoggedIn`, `login`
  - `GET /auth/logout`: `isLoggedIn`, `logout`
  - `GET /auth/kakao`: `passport.authenticate('kakao')`
  - `GET /auth/kakao/callback`
- `page.js`
  - `GET /profile`: `isLoggedIn`, `renderProfile`
  - `GET /join`: `isNotLoggedIn`, `renderJoin`
  - `GET /`: `renderMain`
  - `GET /hashtag`: `renderHashtag`
- `post.js`
  - `POST /post/img`: `isLoggedIn`, `upload.single('img')`, `afterUploadImage`
  - `POST /post`: `isLoggedIn`, `upload2.none()`, `uploadPost`
- `user.js`
  - `POST /user/:id/follow`: `isLoggedIn`, `follow`

## [seeders]

## [uploads]
- 자동생성 + 업로드된 파일 저장

## [views]
- `layout.html`
- `error.html`
- `main.html`
- `join.html`
- `profile.html`

## 기타 파일
- `.env`
- `app.js`
- `package-lock.json`
- `package.json`


</details>



