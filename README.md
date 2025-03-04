# Node.js 개념 정리

### 1. 동시성(Blocking)과 비동기(Non-Blocking)
| 구분 | 설명 |
|---|---|
| **Blocking(동기)** | 대중 목욕탕처럼 앞사람이 끝날 때까지 다음 사람이 대기 |
| **Non-Blocking(비동기)** | 각자 자기 집에서 따로 샤워, 서로 기다리지 않음 |

- **논블로킹**: 이전 작업 완료 대기 없이 바로 다음 작업 수행
- **블로킹**: 이전 작업이 끝나야 다음 작업 수행 가능

---

### 2. 스레드와 프로세스

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

## 3. 서버로서의 Node.js
| 장점 | 설명 |
|---|---|
| 빠른 응답 | 실시간 채팅, 알림 서비스 적합 |
| 비동기 처리 | DB 조회, 파일 읽기 등에 강함 |

| 단점 | 설명 |
|---|---|
| CPU 연산 많을 때 | 이미지 변환, 대용량 데이터 가공 등 비효율적 |

---

## 4. 변수 선언

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
### 5. 함수 호이스팅

#### 선언적 함수 - 호이스팅 O
```javascript
hello();

function hello() {
  console.log('Hello!');
}
```
#### 함수 표현식 - 호이스팅 X (에러 발생)
```javascript

hello(); // TypeError

var hello = function() {
  console.log('Hello!');
};
```
---
#### 6. this와 콜백 함수에서의 우회
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
• this는 바로 앞 객체를 가리킴
• forEach 내부에서는 this가 달라지므로 that에 this를 저장해 해결
---
#### 7. 함수 저장과 호출 차이
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
#### 8. 클래스와 상속
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
• super(): 부모 클래스 생성자 호출
• static: 클래스 메서드로 인스턴스 없이 호출 가능
• instanceof: 클래스 인스턴스 여부 확인
---
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

#### DNS
- 주로 도메인을 통해 IP나 키타 DNS 정보를 얻고자 할 때 사용합니다.

#### crypto
**단반향 암호화**
- 단방향 암호화란 복호화 할 수 없는 암호화 방식을 뜻합니다. 복호화는 암호화된 문자열을 원래 문자열로 되돌려 놓는 것을 의미합니다. 즉, 단방향 암호화는 한번 암호화화면 원래 문자열을 찾을 수 없습니다. 복호화 할 수 없으므로 암호화라고 표현하는 대신 **해시 함수** 라고 부리기도함

```javascript
const crypto = require('crypto');

console.log('base64:', crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex:', crypto.createHash('sha512').update('비밀번호').digest('hex'));
console.log('base64:', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));
```
createHash: 사용할 해쉬 알고리즘을 넣음
update(문자열): 변환할 문자열을 넣습니다. 
digest(인코딩): 인코딩할 알고리즘을 넣습니다.

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


### 양방향 암호화
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

#### utill
- 유틸이라는 이름 처럼 각종 편의 기능을 모아둔 모듈. 계속 해서 API가 추가 되고 있으며, 가끔 deprecated되어 사아지는 경우도 있습니다.
- deprecated란 프로그래밍 용어로 중요도가 떨어져 더 이상 사용되지 않고 앞으로는 사라지게 될 것이라는 뜻
새로운 기능이 나와서 기존 기능보다 더 좋을때, 기존 기능을 디프리케이티드가 처리하곤 한다.
이전 사용자를 위해 기능을 제거하지는 않지만 곧 없앨 예정이므로 더 이상 사용하지 말라는 의미.

#### worker_threads.js
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













