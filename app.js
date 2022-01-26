// Defining global variables used within javascript functions

let currentNumber = "";
let numberVals = [];
let operationVals = [];
let outputNumber = 0;
let fullString = "";

// Getting information from HTML document

const numberButtonsArr = [...document.getElementsByClassName("numbers")];
const functionButtonsArr = [...document.getElementsByClassName("functions")];
const additionalButtons = [...document.getElementsByClassName("lightgrey")];
const allButtons = document.querySelectorAll("button");
const equalsButton = document.getElementById("equal");

console.log(allButtons);

// Function to display output to main display & run once on open page

const displayOutput = (numberToDisplay) => {
  document.getElementById("output__big").innerHTML = numberToDisplay.toLocaleString();
  document.getElementById("output__small").innerHTML = fullString;
}

displayOutput(0);

// Function to clear global variables in input array

const clearValues = (valuesToClear) => {
  let outputArr = [...valuesToClear];
  for(let i = 0; i < valuesToClear.length; i++) {
    if(typeof valuesToClear[i] === "string") {
      outputArr[i] = "";
    } else if(typeof valuesToClear[i] === "number") {
      outputArr[i] = 0;
    } else if(typeof valuesToClear[i] === "object") {
      outputArr[i] = [];
    }
  }
  return outputArr;
}

// Adds preventDefault to all buttons

for(let i= 0; i< allButtons.length; i++) {
  allButtons[i].addEventListener("click", (event) => {
    event.preventDefault();
  })
}

// Adds number addEventListener to all number buttons

for (let i = 0; i < numberButtonsArr.length; i++) {
  numberButtonsArr[i].addEventListener("click", (event) => {
    if(currentNumber.includes(".") && numberButtonsArr[i].innerHTML == ".") {
      alert("You can't have two decimal points in one number!");
    } else {
      currentNumber += numberButtonsArr[i].innerHTML;
      displayOutput(currentNumber);
    }
  })
}

// const numberButtonsEvent = (buttonInnerHtml) => {
//   if(currentNumber.includes(".") && buttonInnerHtml == ".") {
//     alert("You can't have two decimal points in one number!");
//   } else {
//     currentNumber += buttonInnerHtml;
//     displayOutput(currentNumber);
//   }
// }

// Adds function addEventListener to all function buttons

for (let i = 0; i < functionButtonsArr.length; i++) {
  functionButtonsArr[i].addEventListener("click", (event) => {
    numberVals.push(currentNumber);
    operationVals.push(functionButtonsArr[i].innerHTML);
    fullString += currentNumber + functionButtonsArr[i].innerHTML;
    displayOutput(currentNumber);
    [currentNumber] = clearValues([currentNumber]);
  })
}

// const functionButtonsEvent = (buttonInnerHtml) => {
//   numberVals.push(currentNumber);
//   operationVals.push(buttonInnerHtml);
//   fullString += currentNumber + buttonInnerHtml;
//   displayOutput(currentNumber);
//   [currentNumber] = clearValues([currentNumber]);
// }

// Adds function addEventListener to equals button

equalsButton.addEventListener("click", (event) => {
  if(currentNumber != "") {
    fullString += currentNumber + "=";
    calculate();
    [fullString, currentNumber, numberVals, operationVals] = clearValues([fullString, currentNumber, numberVals, operationVals]);
  } else {
    alert("Please ensure the amount of operations and numbers match up!");
  }
})

// const equalsButtonEvent = () => {
//   if(currentNumber != "") {
//     fullString += currentNumber + "=";
//     calculate();
//     [fullString, currentNumber, numberVals, operationVals] = clearValues([fullString, currentNumber, numberVals, operationVals]);
//   } else {
//     alert("Please ensure the amount of operations and numbers match up!");
//   }
// }

// Calculate function used within equals

const calculate = () => {
  numberVals.push(currentNumber);
  outputNumber = Number(numberVals[0]);
  for(let i = 1; i < numberVals.length; i++) {
    if(operationVals[i-1] == "+") {
      outputNumber += Number(numberVals[i]);
    } else if(operationVals[i-1] == "-") {
      outputNumber = outputNumber - Number(numberVals[i]);
    } else if(operationVals[i-1] == "/" && numberVals[i] != "0") {
      outputNumber = outputNumber / Number(numberVals[i]);
    } else if(operationVals[i-1] == "*") {
      outputNumber = outputNumber * Number(numberVals[i]);
    } else if(operationVals[i-1] == "/" && numberVals[i] == "0") {
      alert("Can't divide by 0!");
      [outputNumber] = clearValues([outputNumber]);
    }
  }
  displayOutput(outputNumber);
}

// Adds function to each of the additional function buttons (CE, +/-, %)

for(let i = 0; i < additionalButtons.length; i++) {
  additionalButtons[i].addEventListener("click", (event) => {
    if(additionalButtons[i].id == "remove") {
      [currentNumber, numberVals, operationVals, fullString, outputNumber] = clearValues([currentNumber, numberVals, operationVals, fullString, outputNumber]);
    } else if(additionalButtons[i].id == "percent") {
      outputNumber = document.getElementById("output__big").innerHTML * 0.01;
      currentNumber = (Number(currentNumber)/100).toString();
    } else if(additionalButtons[i].id == "plusMinus") {
      outputNumber = document.getElementById("output__big").innerHTML * -1;
      currentNumber = outputNumber.toString();
    }
    displayOutput(outputNumber);
  })
}

// const additionalButtonsEvent = (buttonId) => {
//   if(additionalButtons[i].id == "remove") {
//     [currentNumber, numberVals, operationVals, fullString, outputNumber] = clearValues([currentNumber, numberVals, operationVals, fullString, outputNumber]);
//   } else if(additionalButtons[i].id == "percent") {
//     outputNumber = document.getElementById("output__big").innerHTML * 0.01;
//     currentNumber = (Number(currentNumber)/100).toString();
//   } else if(additionalButtons[i].id == "plusMinus") {
//     outputNumber = document.getElementById("output__big").innerHTML * -1;
//     currentNumber = outputNumber.toString();
//   }
//   displayOutput(outputNumber);
// }