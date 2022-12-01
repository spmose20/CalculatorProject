const numberButtons = document.querySelectorAll(`[data-number]`);
const operationButtons = document.querySelectorAll(`[data-action]`);
const calculateButton = document.querySelector(`[data-Calculate]`);
const decimalButton = document.querySelector(`[data-number]`);
const clearButton = document.querySelector(`[data-clear]`);
const currentOperandTextElement = document.querySelector(`[data-current-operand]`);
const priorOperandTextElement = document.querySelector(`[data-previous-operand]`);

// methods //

class CalculatorValues {
  constructor(
    currentOperandTextElement , priorOperandTextElement) {
      this.currentOperandTextElement = currentOperandTextElement;
      this.priorOperandTextElement = priorOperandTextElement;
    this.clear()
  }

  clear() {
    this.currentOperand = ` `;
    this.priorOperand = ` `;
    this.operation = undefined;
  }
  addNumber(number) {
    if( number  === `.` && this.currentOperand.includes(`.`)) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
      
  }
  chooseOperation(operation) {
    if (this.currentOperand === ``) return
    if (this.priorOperand !== ``) {
      this.calculate()
    }
    this.operation = operation;
    this.priorOperand = this.currentOperand;
    this.currentOperand = ``;
  }
  calculate() {
    let calculation
    const prior = parseFloat(this.priorOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prior) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        calculation = prior + current;
        break
      case '-':
        calculation = prior - current;
        break
      case '/':
        calculation = prior / current;
        break
      case '*':
        calculation = prior * current;
        break
    }
      this.currentOperand = calculation;
      this.operation = undefined;
      this.priorOperand = ``;
  }
  changeDisplay() {
    this.currentOperandTextElement.innerHTML = this.currentOperand

    this.priorOperandTextElement.innerHTML = this.priorOperand
  }
}

// display //


const Calculator = new CalculatorValues(currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener(`click`, () => { 
  Calculator.addNumber(button.innerText)
  Calculator.changeDisplay()
})
});

operationButtons.forEach(button => {
  button.addEventListener(`click`, () => { 
  Calculator.chooseOperation(button.innerText)
  Calculator.changeDisplay()
})
});
calculateButton.addEventListener(`click`, button => {
    Calculator.calculate();
    Calculator.changeDisplay();
})
clearButton.addEventListener(`click`, button => {
  Calculator.clear();
  Calculator.changeDisplay();
})











