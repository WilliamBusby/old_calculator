"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
var equalsButton = document.getElementById("equal");
console.log(allButtons); // Function to display output to main display & run once on open page

var displayOutput = function displayOutput(numberToDisplay) {
  document.getElementById("output__big").innerHTML = numberToDisplay.toLocaleString();
  document.getElementById("output__small").innerHTML = fullString;
};

displayOutput(0); // Function to clear global variables in input array

var clearValues = function clearValues(valuesToClear) {
  var outputArr = _toConsumableArray(valuesToClear);

  for (var i = 0; i < valuesToClear.length; i++) {
    if (typeof valuesToClear[i] === "string") {
      outputArr[i] = "";
    } else if (typeof valuesToClear[i] === "number") {
      outputArr[i] = 0;
    } else if (_typeof(valuesToClear[i]) === "object") {
      outputArr[i] = [];
    }
  }

  return outputArr;
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
    }
  });
};

for (var _i = 0; _i < numberButtonsArr.length; _i++) {
  _loop(_i);
} // const numberButtonsEvent = (buttonInnerHtml) => {
//   if(currentNumber.includes(".") && buttonInnerHtml == ".") {
//     alert("You can't have two decimal points in one number!");
//   } else {
//     currentNumber += buttonInnerHtml;
//     displayOutput(currentNumber);
//   }
// }
// Adds function addEventListener to all function buttons


var _loop2 = function _loop2(_i2) {
  functionButtonsArr[_i2].addEventListener("click", function (event) {
    numberVals.push(currentNumber);
    operationVals.push(functionButtonsArr[_i2].innerHTML);
    fullString += currentNumber + functionButtonsArr[_i2].innerHTML;
    displayOutput(currentNumber);

    var _clearValues5 = clearValues([currentNumber]);

    var _clearValues6 = _slicedToArray(_clearValues5, 1);

    currentNumber = _clearValues6[0];
  });
};

for (var _i2 = 0; _i2 < functionButtonsArr.length; _i2++) {
  _loop2(_i2);
} // const functionButtonsEvent = (buttonInnerHtml) => {
//   numberVals.push(currentNumber);
//   operationVals.push(buttonInnerHtml);
//   fullString += currentNumber + buttonInnerHtml;
//   displayOutput(currentNumber);
//   [currentNumber] = clearValues([currentNumber]);
// }
// Adds function addEventListener to equals button


equalsButton.addEventListener("click", function (event) {
  if (currentNumber != "") {
    fullString += currentNumber + "=";
    calculate();

    var _clearValues = clearValues([fullString, currentNumber, numberVals, operationVals]);

    var _clearValues2 = _slicedToArray(_clearValues, 4);

    fullString = _clearValues2[0];
    currentNumber = _clearValues2[1];
    numberVals = _clearValues2[2];
    operationVals = _clearValues2[3];
  } else {
    alert("Please ensure the amount of operations and numbers match up!");
  }
}); // const equalsButtonEvent = () => {
//   if(currentNumber != "") {
//     fullString += currentNumber + "=";
//     calculate();
//     [fullString, currentNumber, numberVals, operationVals] = clearValues([fullString, currentNumber, numberVals, operationVals]);
//   } else {
//     alert("Please ensure the amount of operations and numbers match up!");
//   }
// }
// Calculate function used within equals

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

      var _clearValues3 = clearValues([outputNumber]);

      var _clearValues4 = _slicedToArray(_clearValues3, 1);

      outputNumber = _clearValues4[0];
    }
  }

  displayOutput(outputNumber);
}; // Adds function to each of the additional function buttons (CE, +/-, %)


var _loop3 = function _loop3(_i4) {
  additionalButtons[_i4].addEventListener("click", function (event) {
    if (additionalButtons[_i4].id == "remove") {
      var _clearValues7 = clearValues([currentNumber, numberVals, operationVals, fullString, outputNumber]);

      var _clearValues8 = _slicedToArray(_clearValues7, 5);

      currentNumber = _clearValues8[0];
      numberVals = _clearValues8[1];
      operationVals = _clearValues8[2];
      fullString = _clearValues8[3];
      outputNumber = _clearValues8[4];
    } else if (additionalButtons[_i4].id == "percent") {
      outputNumber = document.getElementById("output__big").innerHTML * 0.01;
      currentNumber = (Number(currentNumber) / 100).toString();
    } else if (additionalButtons[_i4].id == "plusMinus") {
      outputNumber = document.getElementById("output__big").innerHTML * -1;
      currentNumber = outputNumber.toString();
    }

    displayOutput(outputNumber);
  });
};

for (var _i4 = 0; _i4 < additionalButtons.length; _i4++) {
  _loop3(_i4);
} // const additionalButtonsEvent = (buttonId) => {
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