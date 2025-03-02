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

console.log(getCandy); //동작이 아니라 함수가 저장된 것이라 함수가 나옴
console.log(count); // 겟켄디가 동작을 안해서 5가 나옴
