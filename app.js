/* PROJECT STATUS
-----PHASE 1-----
-floating point precision issue
-limit length of string to container 
-need to be able to switch operation
    5+-(num to subtract) switch from + operation to -
    add class to button for depressed action
    check for .depressed before performing action
    swap action and depressed status if depressed is found?
-2.2222222e15

-Add data-operation attribute to buttons to bring in possibility to reduce code.
-something like--------
operations = SELECTELEMENTSBYCLASS?
for operation in operationsList{
  operation.addEventListener('click', () => {
  if (nums.length == 0) {
    nums.push(parseFloat(display.innerHTML));
    operation = operation.getAttribute("data-operation");
    resetDispMsg();
  } else if (nums.length == 1) {
    nums.push(parseFloat(display.innerHTML));
    solve();
    operation = operation.getAttribute("data-operation");
    nums.push(parseFloat(display.innerHTML));
    resetDispMsg();
  } else if (parseFloat(display.innerHTML == solution)) {
    nums.push(solution);
    operation = operation.getAttribute("data-operation");
    resetDispMsg();
  }
})
}

-----PHASE 2-----
-OOP for buttons?
-Refactor code where possible
-Media Queries

-----PHASE 3-----
Add functionality
  -see full operation
  -"Take notes" button to save math onto scratch paper
  -"Erase line"?
  -"Cross out line"?

-----PHASE 4-----
Send notes to email

*/

let dispMsg = '';
let nums = [];
let operation;
let solution;
let clrNum = 0;

//CAN THESE BE TURNED INTO OBJECTS LATER??
const numBtns = document.getElementsByClassName('numBtn');
const display = document.getElementById('display');
const equals = document.getElementById('equals');
const clr = document.getElementById('clr');
const multiply = document.getElementById('mult');
const divide = document.getElementById('divide');
const subtract = document.getElementById('subtract');
const add = document.getElementById('add');
const exponent = document.getElementById('exp');
const squareRoot = document.getElementById('sqr-root');
const plusMinus = document.getElementById('plus-minus');

/*-----FUNCTIONS-----*/

const saveNum = () => nums.push(parseFloat(dispMsg));

const err = function() {
  resetVars();
  display.innerHTML = 'ERR';
}

const solve = function() {
  if (operation === 'add') {
    solution = nums[0] + nums[1];
    resetVars();
  } else if (operation === 'subtract') {
    solution = nums[0] - nums[1];
    resetVars();
  } else if (operation === 'multiply') {
    solution = nums[0] * nums[1];
    resetVars();
  } else if (operation === 'divide') {
    solution = nums[0] / nums[1];
    resetVars();
  } else if (operation === 'exponent') {
    solution = Math.pow(nums[0], nums[1]);
    resetVars();
  } else if (operation === 'squareRoot') {
    solution = Math.sqrt(nums[0]);
    resetVars();
  }
  console.log(solution);

  if (isNaN(solution)) {
    console.log(solution);
    err();
  } else {
    display.innerHTML = `${solution}`;
  }
}

const resetVars = function() {
  dispMsg = '';
  nums = [];
  operation = '';
  clrNum = 0;
}

const resetDisplay = function() {
  display.innerHTML = '0';
}

const resetDispMsg = function () {
  dispMsg = '';
}

const resetAll = function () {
  resetVars();
  resetDisplay();
}


/*-----POGRAM-----*/ 

//ASSIGN NUMBER BUTTON EVENTS
for (let i = 0; i < numBtns.length; i++) {
  let num = numBtns[i];
  // if (display.innerHTML == solution) {
  //   resetDisplay();
  // }
  num.addEventListener('click', () => {
    if (num.innerHTML == "." && dispMsg.includes(".")) {
      return;
    } else if (num.innerHTML =="." && dispMsg == '') {
      dispMsg += `0.`;
      display.innerHTML = dispMsg;
    } else {
      dispMsg += `${num.innerHTML}`;
      display.innerHTML = dispMsg;
    }
  })
}

//ASSIGN ACTION BUTTON EVENTS
clr.addEventListener('click', () => {
  if (clrNum === 0) {
    resetDisplay();
    resetDispMsg();
    clrNum+=1;
  } else {
    resetAll();
  }
})

equals.addEventListener('click', () => {
  if (nums.length == 1) {
    saveNum();
    solve();
  } 
})

add.addEventListener('click', () => {
  if (nums.length == 0) {
    nums.push(parseFloat(display.innerHTML));
    operation = "add";
    resetDispMsg();
  } else if (nums.length == 1) {
    nums.push(parseFloat(display.innerHTML));
    solve();
    operation = "add";
    nums.push(parseFloat(display.innerHTML));
    resetDispMsg();
  } else if (parseFloat(display.innerHTML == solution)) {
    nums.push(solution);
    operation = "add";
    resetDispMsg();
  }
})

subtract.addEventListener('click', () => {
  if (nums.length == 0) {
    nums.push(parseFloat(display.innerHTML));
    operation = "subtract";
    resetDispMsg();
  } else if (nums.length == 1) {
    nums.push(parseFloat(display.innerHTML));
    solve();
    operation = "subtract";
    nums.push(parseFloat(display.innerHTML));
    resetDispMsg();
  } else if (parseFloat(display.innerHTML == solution)) {
    nums.push(solution);
    operation = "subtract";
    resetDispMsg();
  }
})

multiply.addEventListener('click', () => {
  if (nums.length == 0) {
    nums.push(parseFloat(display.innerHTML));
    operation = "multiply";
    resetDispMsg();
  } else if (nums.length == 1) {
    nums.push(parseFloat(display.innerHTML));
    solve();
    operation = "multiply";
    nums.push(parseFloat(display.innerHTML));
    resetDispMsg();
  } else if (parseFloat(display.innerHTML == solution)) {
    nums.push(solution);
    operation = "multiply";
    resetDispMsg();
  }
})

divide.addEventListener('click', () => {
  if (nums.length == 0) {
    nums.push(parseFloat(display.innerHTML));
    operation = "divide";
    resetDispMsg();
  } else if (nums.length == 1) {
    nums.push(parseFloat(display.innerHTML));
    solve();
    operation = "divide";
    nums.push(parseFloat(display.innerHTML));
    resetDispMsg();
  } else if (parseFloat(display.innerHTML == solution)) {
    nums.push(solution);
    operation = "divide";
    resetDispMsg();
  }
})

exponent.addEventListener('click', () => {
  if (nums.length == 0) {
    nums.push(parseFloat(display.innerHTML));
    operation = "exponent";
    resetDispMsg();
  } else if (nums.length == 1) {
    nums.push(parseFloat(display.innerHTML));
    solve();
    operation = "exponent";
    nums.push(parseFloat(display.innerHTML));
    resetDispMsg();
  } else if (parseFloat(display.innerHTML == solution)) {
    nums.push(solution);
    operation = "exponent";
    resetDispMsg();
  }
})

squareRoot.addEventListener('click', () => {
  if (parseFloat(display.innerHTML == solution)) {
    nums.push(solution);
    operation = "squareRoot";
    solve();
    resetDispMsg();
  } else if (nums.length == 0) {
    nums.push(parseFloat(display.innerHTML));
    operation = "squareRoot";
    solve();
    resetDispMsg();
  } else if (nums) {
    nums.push(parseFloat(display.innerHTML));
    solve();
    nums.push(solution);
    operation = "squareRoot";
    solve();
  }
})

plusMinus.addEventListener('click', () => {
  if (dispMsg.charAt(0) != "-") {
    dispMsg = "-" + dispMsg;
    display.innerHTML = dispMsg;
  } else if (dispMsg.charAt(0) == "-") {
    dispMsg = dispMsg.substring(1);
    display.innerHTML = dispMsg;
  }
})