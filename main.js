const buttons = document.querySelector(".buttons");
const display = document.querySelector(".disp-result");

let currentNumbers = [];
let operator = "";
let total = null;
let percentageValue = null;

buttons.addEventListener("click", function (event) {
  const clickedButton = event.target;

  if (clickedButton.tagName === "BUTTON") {
    const buttonId = clickedButton.id;

    if (buttonId.startsWith("btn-")) {
      const buttonValue = buttonId.slice(4);
      addToDisplay(buttonValue);
    } else {
      switch (buttonId) {
        case "btnClear":
          clear();
          break;
        case "btnSigns":
          changeSign();
          break;
        case "btnDivision":
          setOperator("/");
          break;
        case "btnMultiply":
          setOperator("*");
          break;
        case "btnSum":
          setOperator("+");
          break;
        case "btnMinus":
          setOperator("-");
          break;
        case "btnEquals":
          setOperator("=");
          break;
        case "btnPercentage":
          setOperator("%");
          break;
        case "btnErase":
          deleteNumber();
          break;
        
      }
    }
  }
});

function clear(){
  display.innerText="";
  total=0;
}

function clearDisplay() {
  display.innerText = "";
  currentNumbers = [];
}

function deleteNumber(){
  currentNumbers.pop();
  display.innerText = currentNumbers.join("");
}

function addToDisplay(number) {
  currentNumbers.push(number);
  display.innerText = currentNumbers.join("");
}

function changeSign(){
  if (currentNumbers.length > 0) {
    const currentNumber = currentNumbers.join("");
    const newNumber = (parseFloat(currentNumber) * -1).toString();

    clearDisplay();
    addToDisplay(newNumber);
  } else {
    total = (total * -1).toString();
    display.innerText = total;
  }
}

function setOperator(op) {
  if (currentNumbers.length > 0) {
    if (total === null) {
      total = parseFloat(currentNumbers.join(""));
    } else {
      performOperation();
    }
  }
  operator = op;
}
function performOperation() {
  let numCurrentNumbers = parseFloat(currentNumbers.join(""));
 
  switch (operator) {
    case "+":
      total = total + numCurrentNumbers;
      break;
    case "-":
      total = total - numCurrentNumbers;
      break;
    case "*":
      total = total * numCurrentNumbers;
      break;
    case "/":
      total = (total / numCurrentNumbers).toFixed(2);
      break;
    case "=":
      total = numCurrentNumbers;
      break;
    case "%":
      if (!isNaN(total)) {
        const result = (total * (numCurrentNumbers / 100)).toFixed(2);
        total = result;
      } else {
        total = (numCurrentNumbers / 100).toFixed(2);
      }
      break;
  }

  clearDisplay();
  display.innerText = total.toString();
}


