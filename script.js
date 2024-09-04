const display = document.querySelector(".result");
const buttons = document.querySelectorAll(".btn");

let currentInput = "0";
let previousInput = "";
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  if (currentInput.replace(",", "").length >= 10) {
    const number = parseFloat(currentInput.replace(",", "."));
    currentInput = number.toExponential(5).replace(".", ",");
  }
  display.textContent = currentInput;
}

function clearCalculator() {
  currentInput = "0";
  previousInput = "";
  operator = null;
  shouldResetDisplay = false;
}
function toggleSign() {
  if (currentInput.charAt(0) === "-") {
    currentInput = currentInput.slice(1);
  } else {
    currentInput = "-" + currentInput;
  }
}

function convertToPercentage() {
  currentInput = (parseFloat(currentInput.replace(",", ".")) / 100)
    .toString()
    .replace(".", ",");
}
function handleNumber(value) {
  if (shouldResetDisplay) {
    if (value === ",") {
      currentInput = "0,";
    } else {
      currentInput = value;
    }
    shouldResetDisplay = false;
  } else {
    if (value === "," && currentInput.includes(",")) return;
    if (currentInput === "0" && value !== ",") {
      currentInput = value;
    } else {
      currentInput = currentInput + value;
    }
  }
}

function calculate() {
  let result;
  const prev = parseFloat(previousInput.replace(",", "."));
  const current = parseFloat(currentInput.replace(",", "."));
  if (isNaN(prev) || isNaN(current)) {
    return;
  }
  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString().replace(".", ",");
  operator = null;
  shouldResetDisplay = true;
}
function handleOperator(value) {
  if (operator !== null) calculate();
  previousInput = currentInput;
  operator = value;
  shouldResetDisplay = true;
}

function handleButtonClick(value) {
  if (!isNaN(value) || value === ",") {
    handleNumber(value);
  } else if (value === "AC") {
    clearCalculator();
  } else if (value === "±") {
    toggleSign();
  } else if (value === "%") {
    convertToPercentage();
  } else if (value === "=") {
    calculate();
  } else {
    handleOperator(value);
  }
  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => handleButtonClick(button.textContent));
});
