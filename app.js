let a = null;
let b = null;
let operation = "";
let skipPrevRead = false;

function read() {
	return document.getElementById("result").value || "0";
}

function write(value) {
	document.getElementById("result").value = value;
}

function addToList(nText) {
	let element = document.getElementById("calcStatusText");
	element.innerHTML += nText;
}

function toInput(value) {
	if (skipPrevRead) {
		write("");
		skipPrevRead = false;
	}
	if (value === "." && !read().includes(".")) {
		write(read() + value);
	} else if (value === "0" && read().includes(".")) {
		write(read() + value);
	} else if (value !== "0" && value !== ".") {
		if (read().includes(".")) {
			write(read() + value);
		} else {
			if (read()[0] === "0") {
				write(read().substring(1) + value);
			} else {
				write(read() + value);
			}
		}
	}
	addToList(value);
}

function subtract() {
	addToList("-");
	if (!operation) {
		a = Number(read());
		operation = "-";
		skipPrevRead = true;
	} else {
		getResult();
	}
}

function addNum() {
	addToList("+");
	if (!operation) {
		a = Number(read());
		operation = "+";
		skipPrevRead = true;
	} else {
		getResult();
	}
}

function multiply() {
	addToList("*");
	if (!operation) {
		a = Number(read());
		operation = "*";
		skipPrevRead = true;
	} else {
		getResult();
	}
}

function divide() {
	addToList("/");
	if (!operation) {
		a = Number(read());
		operation = "/";
		skipPrevRead = true;
	} else {
		getResult();
	}
}

function getResult() {
	addToList("=");
	b = Number(read());
	if (operation) {
		switch (operation) {
		case "-":
			write(a - b);
			a = Number(read());
			b = null;
			break;
		case "+":
			write(a + b);
			a = Number(read());
			b = null;
			break;
		case "*":
			write(a * b);
			a = Number(read());
			b = null;
			break;
		case "/":
			write(a / b);
			a = Number(read());
			b = null;
			break;
		}
	}
	addToList(read() + "; ");
	operation = "";
	skipPrevRead = true;
}

function clearValue() {
	// console.log('clear value');
	write("0");
	a = b = null;
	operation = "";
	let element = document.getElementById("calcStatusText");
	element.innerHTML = "";
}

function sum(a, b) {
	return a + b;
}

module.exports = {
	sum
};
