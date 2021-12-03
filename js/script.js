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

function isOperator(str) {
    return str === "+" || str === "-" || str === "x" || str === "/";
}

function displayNumber(event) {
    let valueToBeAdded;

    if (event.type === "keydown") {
        if (!isNumber(event.key)) return;
        valueToBeAdded = event.key;
    } else {
        if (event.target.nodeName !== "BUTTON") return;
        if (!isNumber(event.target.textContent)) return;
        valueToBeAdded = event.target.textContent;
    }
    
    currentNumber += valueToBeAdded;
    displayOperationNode.textContent += valueToBeAdded;
}

function displayResult(result) {
    displayResultNode.textContent = result;
}

function displayOperator(event) {
    let chosenOperator;
    
    if (event.type === "keydown") {
        if (!isOperator(event.key)) return;
        chosenOperator = " " + event.key + " ";
    } else {
        if (event.target.nodeName !== "BUTTON") return;
        if (!isOperator(event.target.textContent.trim())) return;
        chosenOperator = event.target.textContent;
    }
    
    decimalPointBtn.disabled = false;
    
    if (!previousNumber) {
        previousNumber = currentNumber;
    } else {
        if (currentNumber == 0) {
            displayResult("ERROR: DIVISION BY ZERO");
            return;
        }
        let result = operate(currentOperator, +previousNumber, +currentNumber);
        result = Math.round((result + Number.EPSILON) * 100) / 100;
        previousNumber = result;
        displayResult(result);
    }
    
    currentNumber = "";
    currentOperator = chosenOperator.trim();
    displayOperationNode.textContent += chosenOperator;
}

function displayDecimalPoint() {
    currentNumber += ".";
    displayOperationNode.textContent += ".";
    decimalPointBtn.disabled = true;
}

function evaluateOperation() {
    decimalPointBtn.disabled = false;
    
    if (currentNumber === "") {
        displayResult("ERROR");
        return;
    } else if (currentNumber == 0) {
        displayResult("ERROR: DIVISION BY ZERO");
        return;
    }

    let result = operate(currentOperator, +previousNumber, +currentNumber);
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

window.addEventListener("keydown", displayNumber);
window.addEventListener("keydown", displayOperator);

window.addEventListener("keydown", event => {
    if (event.key === ".") displayDecimalPoint();
});

window.addEventListener("keydown", event => {
    if (event.key === "Enter") evaluateOperation();
});

window.addEventListener("keydown", event => {
    if (event.key === "Escape") clearDisplay();
});

window.addEventListener("keydown", event => {
    if (event.key === "Backspace") backspace();
});