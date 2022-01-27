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
var equalsButton = document.getElementById("equal"); // Function to display output to main display & run once on open page

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


var _loop = function _loop(i) {
  allButtons[i].addEventListener("click", function (event) {
    event.preventDefault();

    if (allButtons[i].id === "equal") {
      equalsButtonEvent();
    } else if (allButtons[i].classList[0] === "lightgrey") {
      additionalButtonsEvent(allButtons[i].id);
    } else if (allButtons[i].classList[0] === "functions") {
      functionButtonsEvent(allButtons[i].innerHTML);
    } else if (allButtons[i].classList[0] === "numbers") {
      numberButtonsEvent(allButtons[i].innerHTML);
    }
  });
};

for (var i = 0; i < allButtons.length; i++) {
  _loop(i);
} // Adds number addEventListener to all number buttons


var numberButtonsEvent = function numberButtonsEvent(buttonInnerHtml) {
  if (currentNumber.includes(".") && buttonInnerHtml == ".") {
    alert("You can't have two decimal points in one number!");
  } else {
    currentNumber += buttonInnerHtml;
    displayOutput(currentNumber);
  }
}; // Adds function addEventListener to all function buttons


var functionButtonsEvent = function functionButtonsEvent(buttonInnerHtml) {
  numberVals.push(currentNumber);
  operationVals.push(buttonInnerHtml);
  fullString += currentNumber + buttonInnerHtml;
  displayOutput(currentNumber);

  var _clearValues = clearValues([currentNumber]);

  var _clearValues2 = _slicedToArray(_clearValues, 1);

  currentNumber = _clearValues2[0];
}; // Adds function addEventListener to equals button


var equalsButtonEvent = function equalsButtonEvent() {
  if (currentNumber != "") {
    fullString += currentNumber + "=";
    calculate();

    var _clearValues3 = clearValues([fullString, currentNumber, numberVals, operationVals]);

    var _clearValues4 = _slicedToArray(_clearValues3, 4);

    fullString = _clearValues4[0];
    currentNumber = _clearValues4[1];
    numberVals = _clearValues4[2];
    operationVals = _clearValues4[3];
  } else {
    alert("Please ensure the amount of operations and numbers match up!");
  }
}; // Adds function to each of the additional function buttons (CE, +/-, %)


var additionalButtonsEvent = function additionalButtonsEvent(buttonId) {
  if (buttonId == "remove") {
    var _clearValues5 = clearValues([currentNumber, numberVals, operationVals, fullString, outputNumber]);

    var _clearValues6 = _slicedToArray(_clearValues5, 5);

    currentNumber = _clearValues6[0];
    numberVals = _clearValues6[1];
    operationVals = _clearValues6[2];
    fullString = _clearValues6[3];
    outputNumber = _clearValues6[4];
  } else if (buttonId == "percent") {
    outputNumber = document.getElementById("output__big").innerHTML * 0.01;
    currentNumber = (Number(currentNumber) / 100).toString();
  } else if (buttonId == "plusMinus") {
    outputNumber = document.getElementById("output__big").innerHTML * -1;
    currentNumber = outputNumber.toString();
  }

  displayOutput(outputNumber);
}; // Calculate function used within equals


var calculate = function calculate() {
  numberVals.push(currentNumber);
  outputNumber = Number(numberVals[0]);

  for (var _i2 = 1; _i2 < numberVals.length; _i2++) {
    if (operationVals[_i2 - 1] == "+") {
      outputNumber += Number(numberVals[_i2]);
    } else if (operationVals[_i2 - 1] == "-") {
      outputNumber = outputNumber - Number(numberVals[_i2]);
    } else if (operationVals[_i2 - 1] == "/" && numberVals[_i2] != "0") {
      outputNumber = outputNumber / Number(numberVals[_i2]);
    } else if (operationVals[_i2 - 1] == "*") {
      outputNumber = outputNumber * Number(numberVals[_i2]);
    } else if (operationVals[_i2 - 1] == "/" && numberVals[_i2] == "0") {
      alert("Can't divide by 0!");

      var _clearValues7 = clearValues([outputNumber]);

      var _clearValues8 = _slicedToArray(_clearValues7, 1);

      outputNumber = _clearValues8[0];
    }
  }

  displayOutput(outputNumber);
};