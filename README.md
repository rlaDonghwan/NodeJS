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
