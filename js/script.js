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