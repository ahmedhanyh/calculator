function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    return number1 / number2;
}

// The function operate takes an arithmetic operator and two numbers,
// and performs an operation (addition, subtraction, ...) on those two numbers
function operate(operator, number1, number2) {
    if (operator === "+") {
        return add(number1, number2);
    } else if (operator === "-") {
        return subtract(number1, number2);
    } else if (operator === "x") {
        return multiply(number1, number2);
    } else if (operator === "/") {
        return divide(number1, number2);
    }
}

const displayOperationNode = document.querySelector("#operation");
const displayResultNode = document.querySelector("#result");
const decimalPointBtn = document.querySelector("#decimal-point");

let previousNumber = ""
  , currentNumber = ""
  , currentOperator = "";

function isNumber(str) {
    const strToNumber = Number(str);
    return String(strToNumber) === str;
}

function displayNumber(event) {
    if (event.target.nodeName !== "BUTTON") return;
    if (!isNumber(event.target.textContent)) return;
    
    currentNumber += event.target.textContent;
    displayOperationNode.textContent += event.target.textContent;
}

function displayResult(result) {
    displayResultNode.textContent = result;
}

function displayOperator(event) {
    if (event.target.nodeName !== "BUTTON") return;
    if (isNumber(event.target.textContent)) return;
    if (event.target.textContent === "C"
      || event.target.textContent === "="
      || event.target.textContent === "."
      || event.target.textContent === "DEL") return;
      
    decimalPointBtn.disabled = false;

    if (!previousNumber) {
        previousNumber = currentNumber;
    } else {
        let result = operate(currentOperator, +previousNumber, +currentNumber);
        if (result === Infinity) {
            displayResult("ERROR: DIVISION BY ZERO");
            return;
        }
        result = Math.round((result + Number.EPSILON) * 100) / 100;
        previousNumber = result;
        displayResult(result);
    }
    
    currentNumber = "";
    
    currentOperator = event.target.textContent.trim();
    displayOperationNode.textContent += event.target.textContent;
}

function displayDecimalPoint() {
    currentNumber += ".";
    displayOperationNode.textContent += ".";
    decimalPointBtn.disabled = true;
}

function evaluateOperation() {
    decimalPointBtn.disabled = false;
    
    let result = operate(currentOperator, +previousNumber, +currentNumber);
    
    if (currentNumber === "") {
        displayResult("ERROR");
        return;
    } else if (result === Infinity) {
        displayResult("ERROR: DIVISION BY ZERO");
        return;
    }

    result = Math.round((result + Number.EPSILON) * 100) / 100;
    displayResult(result);
}

function clearDisplay() {
    decimalPointBtn.disabled = false;
    previousNumber = "";
    currentNumber = "";
    currentOperator = "";
    displayOperationNode.textContent = "";
    displayResultNode.textContent = "";
}

function backspace() {
    const currentDisplayValue = displayOperationNode.textContent;
    displayOperationNode.textContent = currentDisplayValue.slice(0, -1);
}

document.querySelector("#calculator-buttons")
  .addEventListener("click", displayNumber);

document.querySelector("#calculator-buttons")
  .addEventListener("click", displayOperator);

document.querySelector("#equal-button")
  .addEventListener("click", evaluateOperation);

document.querySelector("#clear-button")
  .addEventListener("click", clearDisplay);

document.querySelector("#delete-button")
  .addEventListener("click", backspace);

decimalPointBtn.addEventListener("click", displayDecimalPoint);