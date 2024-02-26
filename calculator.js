let displayValue = '0';
let operator = '';
let firstOperand = '';
let waitingForSecondOperand = false;

function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue;
}

function clearDisplay() {
    displayValue = '0';
    operator = '';
    firstOperand = '';
    waitingForSecondOperand = false;
    updateDisplay();
}

function appendNumber(number) {
    if (waitingForSecondOperand) {
        displayValue = number;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    updateDisplay();
}

function setOperator(op) {
    if (operator && waitingForSecondOperand) {
        operator = op;
        updateDisplay();
        return;
    }

    if (firstOperand === '') {
        firstOperand = displayValue;
    } else if (operator) {
        const result = calculate(firstOperand, displayValue, operator);
        displayValue = String(result);
        firstOperand = displayValue;
    }

    operator = op;
    waitingForSecondOperand = true;
    updateDisplay();
}

function calculateResult() {
    if (operator && firstOperand && !waitingForSecondOperand) {
        displayValue = calculate(firstOperand, displayValue, operator);
        operator = '';
        firstOperand = '';
        waitingForSecondOperand = true;
        updateDisplay();
    }
}

function calculate(num1, num2, op) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 !== 0) {
                return num1 / num2;
            } else {
                alert("Cannot divide by zero");
                clearDisplay();
                return 0;
            }
        default:
            return num2;
    }
}

updateDisplay();
