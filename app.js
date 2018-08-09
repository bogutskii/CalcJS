let firstValue = "";
let secondValue = "";
let operandValue = "";

//let skipPrevRead = false;

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
	document.getElementById("display").value = n;
}

function operand(operand) {
	write("");
	operandValue = operand;
}

function getResult() {
	if (operandValue === "+") {
		write(+firstValue + +secondValue);
	}
	if (operandValue === "-") {
		write(+firstValue - +secondValue);
	}
	if (operandValue === "*") {
		write(+firstValue * +secondValue);
	}
	if (operandValue === "/") {
		write(+firstValue / +secondValue);
	}
}


function clearValue() {
  write("0");
	firstValue = secondValue = '';
	operation = "";
}



//
// function addToList(Text) {
// 	let element = document.getElementById("historyLog");
// 	element.innerHTML += Text;
// }


// function clearValue() {
// 	// console.log('clear value');
// 	write("0");
// 	firstValue = secondValue = null;
// 	operation = "";
// 	let element = document.getElementById("historyLog");
// 	element.innerHTML = "";
// }


module.exports = {

};
