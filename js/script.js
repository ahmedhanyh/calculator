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
    if (event.target.textContent === "C" || event.target.textContent === "=") return;

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

    // let result = !previousNumber ? currentNumber
    //             : operate(currentOperator, +previousNumber, +currentNumber);
    
    // previousNumber = result;
    // displayResult(result);

    currentNumber = "";
    currentOperator = event.target.textContent.trim();
    displayOperationNode.textContent += event.target.textContent;
}

function evaluateOperation() {
    if (currentNumber === "") {
        displayResult("ERROR");
        return;
    }
    const result = operate(currentOperator, +previousNumber, +currentNumber);
    displayResult(result);
}

function clearDisplay() {
    previousNumber = "";
    currentNumber = "";
    currentOperator = "";
    displayOperationNode.textContent = "";
    displayResultNode.textContent = "";
}

document.querySelector("#calculator-buttons")
  .addEventListener("click", displayNumber);

document.querySelector("#calculator-buttons")
  .addEventListener("click", displayOperator);

document.querySelector("#equal-button")
  .addEventListener("click", evaluateOperation);

document.querySelector("#clear-button")
  .addEventListener("click", clearDisplay);