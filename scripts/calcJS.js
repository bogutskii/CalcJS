let firstValue = '';
let secondValue = '';
let operandValue = '';

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
