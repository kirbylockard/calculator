/* PROJECT STATUS
-----PHASE 1-----
COMPLETE
-----PHASE 2-----
-Media Queries
-Improve CSS

-----PHASE 3-----
Add functionality
  -see full operation
  -"Take notes" button to save math onto scratch paper
  -"Erase line"?
  -"Cross out line"?

-----PHASE 4-----
Send notes to email

*/
//vars needed for math operations
let dispMsg = '';
let nums = [];
let numsAfterDec = [];
let operation;
let solution;
let clrNum = 0;
let lastBtn;

//Checking display and text size
let dispTotal;
let padding;
let innerSpace;
let textSize;
//html elements
const numBtns = document.getElementsByClassName('numBtn');
const doubleOperands = document.getElementsByClassName('doubleOperand');
const displayContainer = document.getElementById('display-container');
const display = document.getElementById('display');
const equals = document.getElementById('equals');
const clr = document.getElementById('clr');
const squareRoot = document.getElementById('sqr-root');
const plusMinus = document.getElementById('plus-minus');


/*-----FUNCTIONS-----*/

const saveNum = function () {
  console.log(`saving num ${parseFloat(display.innerHTML)}`);
  nums.push(parseFloat(display.innerHTML));
} 

const err = function() {
  resetVars();
  display.innerHTML = 'ERR';
}

const resetVars = function() {
  dispMsg = '';
  nums = [];
  numsAfterDec = [];
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

const checkTextFits = function () {
  dispTotal = displayContainer.clientWidth;
  padding = parseFloat(window.getComputedStyle(displayContainer).getPropertyValue('padding-left'));
  innerSpace = dispTotal - padding;
  textSize = display.clientWidth;

  if (textSize < innerSpace) {
    console.log('text fits');
    return true;
  } else if (textSize > innerSpace) {
    console.log('overflow text');
    return false;
  }
}

const toggleActiveOppClass = function () {
  let activeOperation = document.getElementById(operation);
  activeOperation.classList.toggle('active-operation');
}

const flash = function (clickable) {
  clickable.classList.toggle('active-operation');
  setTimeout(() => {clickable.classList.toggle('active-operation')}, 300);
}


const solve = function() {
  if (operation === 'add') {
    solution = Math.round((nums[0] + nums[1]) * 1e12) / 1e12;
  } else if (operation === 'subtract') {
    solution = Math.round((nums[0] - nums[1]) * 1e12) / 1e12;;
  } else if (operation === 'multiply') {
    solution = Math.round((nums[0] * nums[1]) * 1e12) / 1e12;;
  } else if (operation === 'divide') {
    solution = Math.round((nums[0] / nums[1]) * 1e12) / 1e12;;
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

 
  if (checkTextFits() == false) {
    solution = solution.toExponential(4);
    display.innerHTML = `${solution}`;
    console.log('change solution to scientific notation')
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
    } else if (num.innerHTML == "." && dispMsg == "-0") {
      dispMsg = "-0.";
      display.innerHTML = dispMsg;
    } else if (dispMsg == "-0") {
      dispMsg = "-" + `${num.innerHTML}`;
      display.innerHTML = dispMsg;
    } else if (num.innerHTML =="0" && parseFloat(dispMsg) === 0 && dispMsg.includes(".") == false ) {
      return;
    } else {
      dispMsg += `${num.innerHTML}`;
      display.innerHTML = dispMsg;
    }
    //no overflow
    if (checkTextFits() == false) {
      dispMsg = dispMsg.substring(0, dispMsg.length - 1);
      display.innerHTML = dispMsg;
      console.log('text doesnt fit. no more numbers');
    }
    //toggle operator class
    if (lastBtn == 'operator') {
      toggleActiveOppClass();
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
      toggleActiveOppClass();
      operation = currentOppAssigned;
      toggleActiveOppClass();
    } else if (nums.length == 0) {
      saveNum()
      operation = currentOppAssigned;
      resetDispMsg();
      toggleActiveOppClass();
    } else if (nums.length == 1) {
      saveNum()
      solve();
      operation = currentOppAssigned;
      saveNum()
      resetDispMsg();
      toggleActiveOppClass();
    }

    //currentOpp.classList.toggle('active-operation');
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
  flash(clr);
})

equals.addEventListener('click', () => {
  if (nums.length == 1) {
    saveNum();
    solve();
  } 
  flash(equals);
})

plusMinus.addEventListener('click', () => {
  if (display.innerHTML == "0" || dispMsg == "") {
    dispMsg = "0";
  }
  if (parseFloat(display.innerHTML) == solution) {
    dispMsg = "-" + solution;
    display.innerHTML = dispMsg;
  } else if (dispMsg.charAt(0) != "-") {
    dispMsg = "-" + dispMsg;
    display.innerHTML = dispMsg;
  } else if (dispMsg.charAt(0) == "-") {
    dispMsg = dispMsg.substring(1);
    display.innerHTML = dispMsg;
  } 
  flash(plusMinus);
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
  flash(squareRoot);
})

