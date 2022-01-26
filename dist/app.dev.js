"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Defining global variables used within javascript functions
var currentNumber = "";
var numberVals = [];
var operationVals = [];
var outputNumber = 0;
var fullString = ""; // Getting information from HTML document

var numberButtonsArr = _toConsumableArray(document.getElementsByClassName("numbers"));

var functionButtonsArr = _toConsumableArray(document.getElementsByClassName("functions"));

var additionalButtons = _toConsumableArray(document.getElementsByClassName("lightgrey"));

var allButtons = document.querySelectorAll("button");
var equalsButton = document.getElementById("equal"); // Function to display output to main display & run once on open page

var displayOutput = function displayOutput(numberToDisplay) {
  document.getElementById("output__big").innerHTML = numberToDisplay.toLocaleString();
};

displayOutput(0); // Function to display full equation

var smallDisplay = function smallDisplay() {
  document.getElementById("output__small").innerHTML = fullString;
}; // Function to clear global variables in input array


var clearValues = function clearValues(valuesToClear) {
  for (var i = 0; i < valuesToClear.length; i++) {
    if (valuesToClear[i] == "currentNumber") {
      currentNumber = "";
    } else if (valuesToClear[i] == "numberVals") {
      numberVals = [];
    } else if (valuesToClear[i] == "operationVals") {
      operationVals = [];
    } else if (valuesToClear[i] == "outputNumber") {
      outputNumber = 0;
    } else if (valuesToClear[i] == "fullString") {
      fullString = "";
    }
  }
}; // Adds preventDefault to all buttons


for (var i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", function (event) {
    event.preventDefault();
  });
} // Adds number addEventListener to all number buttons


var _loop = function _loop(_i) {
  numberButtonsArr[_i].addEventListener("click", function (event) {
    if (currentNumber.includes(".") && numberButtonsArr[_i].innerHTML == ".") {
      alert("You can't have two decimal points in one number!");
    } else {
      currentNumber += numberButtonsArr[_i].innerHTML;
      displayOutput(currentNumber);
      smallDisplay();
    }
  });
};

for (var _i = 0; _i < numberButtonsArr.length; _i++) {
  _loop(_i);
} // Adds function addEventListener to all function buttons


var _loop2 = function _loop2(_i2) {
  functionButtonsArr[_i2].addEventListener("click", function (event) {
    numberVals.push(currentNumber);
    operationVals.push(functionButtonsArr[_i2].innerHTML);
    fullString += currentNumber + functionButtonsArr[_i2].innerHTML;
    displayOutput(currentNumber);
    clearValues(["currentNumber"]);
    smallDisplay();
  });
};

for (var _i2 = 0; _i2 < functionButtonsArr.length; _i2++) {
  _loop2(_i2);
} // Adds function addEventListener to equals button


equalsButton.addEventListener("click", function (event) {
  if (currentNumber != "") {
    fullString += currentNumber + "=";
    smallDisplay();
    calculate();
    displayOutput(outputNumber);
  } else {
    alert("Please ensure the amount of operations and numbers match up!");
  }
}); // Calculate function used within equals

var calculate = function calculate() {
  numberVals.push(currentNumber);
  outputNumber = Number(numberVals[0]);

  for (var _i3 = 1; _i3 < numberVals.length; _i3++) {
    if (operationVals[_i3 - 1] == "+") {
      outputNumber += Number(numberVals[_i3]);
    } else if (operationVals[_i3 - 1] == "-") {
      outputNumber = outputNumber - Number(numberVals[_i3]);
    } else if (operationVals[_i3 - 1] == "/" && numberVals[_i3] != "0") {
      outputNumber = outputNumber / Number(numberVals[_i3]);
    } else if (operationVals[_i3 - 1] == "*") {
      outputNumber = outputNumber * Number(numberVals[_i3]);
    } else if (operationVals[_i3 - 1] == "/" && numberVals[_i3] == "0") {
      alert("Can't divide by 0!");
      clearValues(["outputNumber"]);
    }
  }

  clearValues(["currentNumber", "numberVals", "operationVals", "fullString"]);
}; // Adds function to each of the additional function buttons (CE, +/-, %)


var _loop3 = function _loop3(_i4) {
  additionalButtons[_i4].addEventListener("click", function (event) {
    if (additionalButtons[_i4].id == "remove") {
      clearValues(["currentNumber", "outputNumber", "numberVals", "operationVals", "fullString"]);
    } else if (additionalButtons[_i4].id == "percent") {
      outputNumber = document.getElementById("output__big").innerHTML * 0.01;
      currentNumber = (Number(currentNumber) / 100).toString();
    } else if (additionalButtons[_i4].id == "plusMinus") {
      outputNumber = document.getElementById("output__big").innerHTML * -1;

      if (currentNumber.charAt(0) !== "-") {
        currentNumber = "-" + currentNumber;
      } else {
        currentNumber = currentNumber.substring(1);
      }
    }

    displayOutput(outputNumber);
    smallDisplay();
  });
};

for (var _i4 = 0; _i4 < additionalButtons.length; _i4++) {
  _loop3(_i4);
}