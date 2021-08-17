const boxBtn = document.querySelector(".box-btn-main-table");
const START_VALUE = "0";

function setNumbers(inputData, outputData) {
  if (
    outputData.innerText[0] === "0" &&
    outputData.innerText.length === 1 &&
    outputData.innerText[1] !== "."
  ) {
    if (/[\+\-\*\/]/.test(outputData.innerText.slice(-1))) {
      outputData.innerText += inputData;
      return;
    }
    outputData.innerText = "";
  }
  outputData.innerText += inputData;
}

function setDot(outputData) {
  if (
    outputData.innerText.match(/\.+?/g) &&
    outputData.innerText.match(/\.+?/g).length >= 2
  ) {
    return;
  }
  if (
    !/\./.test(outputData.innerText) ||
    /[\+\-\*\/]/.test(outputData.innerText.slice(1))
  ) {
    outputData.innerText += ".";
  }
}

function setPlusMinus(outputData) {
  if (
    /[\+\*\/]/.test(outputData.innerText[outputData.innerText.length - 1]) ||
    /\\d-$/.test(outputData.innerText.slice(-2))
  ) {
    outputData.innerText += "-";
  }
  if (outputData.innerText.length === 1 && outputData.innerText[0] === "0")
    return;

  if (!/[\+\*\/]/.test(outputData.innerText)) {
    outputData.innerText =
      outputData.innerText[0] !== "-"
        ? "-" + outputData.innerText
        : outputData.innerText.slice(1);
  }
}

function clearData(outputData) {
  outputData.innerText = START_VALUE;
}

function deleteData(outputData) {
  if (outputData.innerText !== START_VALUE) {
    outputData.innerText =
      outputData.innerText.length === 1
        ? START_VALUE
        : outputData.innerText.slice(0, -1);
    if (outputData.innerText.length === 1 && outputData.innerText[0] === "-") {
      outputData.innerText = START_VALUE;
    }
  }
}

function setArithmeticOperation(eventData, outputData) {
  if (/[\+\-\*\/]/.test(outputData.innerText.slice(1))) {
    outputData.innerText = executeCalculation(outputData);
    outputData.innerText += eventData.dataset.arithmeticOperation;
  } else {
    outputData.innerText += eventData.dataset.arithmeticOperation;
  }
}

function setOutputData(eventData, outputData) {
  if (eventData.dataset.numbers) {
    setNumbers(eventData.innerText, outputData);
  }
  if (eventData.dataset.dot) {
    setDot(outputData);
  }
  if (eventData.dataset.plusMinus) {
    setPlusMinus(outputData);
  }
  if (eventData.dataset.clear) {
    clearData(outputData);
  }
  if (eventData.dataset.delete) {
    deleteData(outputData);
  }
  if (eventData.dataset.arithmeticOperation) {
    setArithmeticOperation(eventData, outputData);
  }
}

function getTypeOperation(outputData) {
  const [typeOperation] = outputData.innerText.slice(1).match(/[\+\-\*\/]/);
  return typeOperation;
}

function executeCalculation(outputData) {
  let typeOperation = getTypeOperation(outputData);
  let result = outputData.innerText.split(typeOperation);
  switch (typeOperation) {
    case "/":
      result = parseFloat(result[0]) / parseFloat(result[1]);
      break;
    case "*":
      result = parseFloat(result[0]) * parseFloat(result[1]);
      break;
    case "+":
      result = parseFloat(result[0]) + parseFloat(result[1]);
      break;
    case "-":
      result = parseFloat(result[0]) - parseFloat(result[1]);
      break;
  }
  return result;
}

function calculator(event) {
  const outputData = document.getElementById("output");
  const eventData = event.target;

  if (Object.keys(eventData.dataset).length === 0) return;

  if (outputData.disabled === true) {
    clearError(outputData);
  }

  if (!eventData.dataset.equality || !eventData.dataset.arithmeticOperation) {
    setOutputData(eventData, outputData);
  }
  if (eventData.dataset.equality) {
    outputData.innerText = executeCalculation(outputData);
  }
}

boxBtn.addEventListener("click", calculator);
