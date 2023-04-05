let result = document.getElementById("result");

function press(num) {
  // 値が空の時に小数点とマイナス以外の演算子を入力できないようにする
  if (result.value === "" && ["+", "*", "/", "."].includes(num)) {
    return;
  }
  // 値が空の時に00を入力できないようにする
  if (result.value === "" && num === "00") {
    return;
  }
  // 連続して演算子や小数点を入力できないようにする
  if (num === "." && result.value.includes(".")) {
    return;
  } else if (num === "+" && isLastCharOperator()) {
    return;
  } else if (num === "-" && isLastCharOperator()) {
    return;
  } else if (num === "*" && isLastCharOperator()) {
    return;
  } else if (num === "/" && isLastCharOperator()) {
    return;
  }
  // 値が0の時に1から9までの数値が入力された場合は値を上書きする
  if (result.value === "0" && /[1-9]/.test(num)) {
    result.value = num;
  }
  // 値が0の時に00を入力できないようにする
  else if (result.value === "0" && num === "00") {
    return;
  }
  // 値が0の時に小数点と演算子は入力できるようにする
  else if (result.value === "0" && (num === "." || isOperator(num))) {
    result.value += num;
  }
  // それ以外の場合は値を追加する
  else {
    result.value += num;
  }
}

function isLastCharOperator() {
  const operators = ["+", "-", "*", "/"];
  const lastChar = result.value.charAt(result.value.length - 1);
  return operators.includes(lastChar);
}

function isOperator(char) {
  const operators = ["+", "-", "*", "/"];
  return operators.includes(char);
}

function clearResult() {
  result.value = "";
}

function pressEquals() {
  calculate();
}

function calculate() {
  try {
    let expression = result.value;
    let resultValue = eval(expression);
    if (isNaN(resultValue) || !isFinite(resultValue)) {
      throw new Error("Invalid calculation");
    }
    result.value = resultValue;
  } catch (err) {
    result.value = "Error";
  }
}
