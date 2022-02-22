/* PROJECT STATUS
-----PHASE 1-----
-floating point precision issue
-limit length of string to container 
-keep solution when -/+ is pressed
  -keep 0 too at first
-css classes for operations
  -timed
  -constant(cleared by numBtn)
-2.2222222e15


-----PHASE 2-----
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
let lastBtn;

const numBtns = document.getElementsByClassName('numBtn');
const doubleOperands = document.getElementsByClassName('doubleOperand');
const display = document.getElementById('display');
const equals = document.getElementById('equals');
const clr = document.getElementById('clr');
const squareRoot = document.getElementById('sqr-root');
const plusMinus = document.getElementById('plus-minus');

/*-----FUNCTIONS-----*/

const saveNum = () => nums.push(parseFloat(display.innerHTML));

const err = function() {
  resetVars();
  display.innerHTML = 'ERR';
}

const resetVars = function() {
  dispMsg = '';
  nums = [];
  operation = undefined;
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

const solve = function() {
  if (operation === 'add') {
    solution = nums[0] + nums[1];
  } else if (operation === 'subtract') {
    solution = nums[0] - nums[1];
  } else if (operation === 'multiply') {
    solution = nums[0] * nums[1];
  } else if (operation === 'divide') {
    solution = nums[0] / nums[1];
  } else if (operation === 'exponent') {
    solution = Math.pow(nums[0], nums[1]);
  } else if (operation === 'squareRoot') {
    solution = Math.sqrt(nums[0]);
  }
  console.log(solution);

  if (isNaN(solution)) {
    console.log(solution);
    err();
  } else {
    display.innerHTML = `${solution}`;
  }
  resetVars();
}


/*-----POGRAM-----*/ 

//ASSIGN NUMBER BUTTON EVENTS
for (let i = 0; i < numBtns.length; i++) {
  let num = numBtns[i];
  if (display.innerHTML == solution) {
    resetDisplay();
  }
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
    lastBtn = 'num';
  })
}

//ASSIGN DOUBLE OPERAND EVENTS

for (let i = 0; i < doubleOperands.length; i++) {
  let currentOpp = doubleOperands[i];
  let currentOppAssigned = currentOpp.dataset.operation; 
  currentOpp.addEventListener('click', () => {
    if (lastBtn == "operator") {
      operation = currentOppAssigned;
    } else if (nums.length == 0) {
      saveNum()
      operation = currentOppAssigned;
      resetDispMsg();
    } else if (nums.length == 1) {
      saveNum()
      solve();
      operation = currentOppAssigned;
      saveNum()
      resetDispMsg();
    }
    lastBtn = "operator";
  })
}

//ASSIGN UNIQUE ACTION BUTTON EVENTS
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

plusMinus.addEventListener('click', () => {
  if (dispMsg.charAt(0) != "-") {
    dispMsg = "-" + dispMsg;
    display.innerHTML = dispMsg;
  } else if (dispMsg.charAt(0) == "-") {
    dispMsg = dispMsg.substring(1);
    display.innerHTML = dispMsg;
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

