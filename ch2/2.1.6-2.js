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
