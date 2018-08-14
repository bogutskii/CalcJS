let firstValue = '';
let secondValue = '';
let operandValue = '';

// let skipPrevRead = false;

function toInput(n) {
  if (operandValue) {
    secondValue += n;
    write(secondValue);
  } else {
    firstValue += n;
    write(firstValue);
  }
}

function write(n) {
  document.getElementById('display').value = n;
}

function operand(operand) {
  write('');
  operandValue = operand;
}

function postOperand() {
  secondValue = '';
  firstValue = '';
  operandValue = '';
}

function clearValue(firstValueBydefault = '') {
  write('');
  postOperand();
}

function getResult() {
  let result = '';

  if (operandValue === '+') {
    result = +firstValue + +secondValue;
  }
  if (operandValue === '-') {
    result = +firstValue - +secondValue;
  }
  if (operandValue === '*') {
    result = +firstValue * +secondValue;
  }
  if (operandValue === '/') {
    result = +firstValue / +secondValue;
  }
  write(result);
  postOperand();
}

function dotValue() {
  if (document.getElementById('display').value.include('.')) {
    document.getElementById('display').value
  }
  else {
    document.getElementById('display').value +'.';
  }

    }