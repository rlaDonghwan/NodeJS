var sayNode = function() { //함수 변수
  console.log('Node');
};

var es = 'ES'; //변수

var oldObject = { // = 중괄호 있으면 객체다
  sayJS: function() { // sayjs라는 함수를 지어 넣음
    console.log('JS');
  },
  sayNode: sayNode, // Node 출력 밖에 있는 함수를 객체 안에다가 선언? 넣은거? 
};

oldObject[es + 6] = 'Fantastic';

oldObject.sayNode(); // Node
oldObject.sayJS(); // JS
console.log(oldObject.ES6); // Fantastic
