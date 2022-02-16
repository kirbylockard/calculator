/* Functionality:
startNum = "0";
num1
num2
operation

User clicks num buttons
  on 'click'
      get inner html of the button
        if clicked != "." remove "0" from startNum
      .push() to startNum

User clicks an action button
  on 'click'
    parseFloat(startNum) to a num1 variable



save num1
save operation
save num2
  if = clicked
    if (operation) num1 action num2
  if action clicked
    solve num1 action num2
    num1 = solution
    num2 = ''
    operation = new action clicked
*/
let dispMsg = '';
let num1;
let num2;
let operation;
let solution;
let clrNum = 0;
const numBtns = document.getElementsByClassName('numBtn');
const display = document.getElementById('display');
const equals = document.getElementById('equals');
const clr = document.getElementById('clr');
const mult = document.getElementById('mult');
const divide = document.getElementById('divide');
const subtract = document.getElementById('subtract');
const add = document.getElementById('add');
const exp = document.getElementById('exp');
const sqr_root = document.getElementById('sqr-root');

/*-----FUNCTIONS-----*/

const saveNum1 = () => num1 = parseFloat(dispMsg)

const saveNum2 = () => num2 = parseFloat(dispMsg)

const err = function() {
  resetVars();
  display.innerHTML = 'ERR';
}

const solve = function() {
  if (operation === 'add') {
    solution = num1 + num2;
    resetVars();
  } else if (operation === 'subtract') {
    solution = num1 - num2;
    resetVars();
  } else if (operation === 'multiply') {
    solution = num1 * num2;
    resetVars();
  } else if (operation === 'divide') {
    solution = num1 / num2;
    resetVars();
  } else if (operation === 'exponent') {
    solution = Math.pow(num1, num2);
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
  num1 = '';
  num2 = '';
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
  if (display.innerHTML == solution) {
    resetDisplay();
  }
  num.addEventListener('click', () => {
    dispMsg += `${num.innerHTML}`;
    display.innerHTML = dispMsg;
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
  if (num1) {
    saveNum2();
    console.log(num2);
    solve();
  }
})


//fix logic for 2+3+6 >11 not 9 --- 2+3=+6 works
add.addEventListener('click', () => {
  if (parseFloat(display.innerHTML) == solution) {
    num1 = solution;
    operation = "add";
    display.innerHTML = '';
    dispMsg = '';
  }//need solution for 2+3+6 
  else{  
    saveNum1();
    console.log(num1);
    operation = "add";
    display.innerHTML = '';
    dispMsg = '';
  }
})







