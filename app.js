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

function clearValue(firstValueByDefault = '') {
  firstValue = '';
  secondValue = '';
  operandValue = '';
}


function getResult() {
  let result = 0;

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
  clearValue(result);
}
