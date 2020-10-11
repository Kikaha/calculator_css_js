
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys')
const display = calculator.querySelector('.calculator__display');

const finalResult = (result,sign) =>{
    switch(sign){
        case "+": return +result[0]+ +result[1];
        case "-": return +result[0]- +result[1];
        case "/": return +result[0]/ +result[1];
        case "*": return +result[0]* +result[1];
    }
}

keys.addEventListener('click', event => {
    if (!event.target.closest('button')) return;

    const key = event.target;
    const keyValue = key.innerText;
    const displayValue = display.textContent;
    // const type = key.dataset.type;
    const { type } = key.dataset;
    const { previousKeyType } = calculator.dataset;

    if (type === "number") {
        if (displayValue === '0') {
            display.innerText = keyValue;
        } else if (previousKeyType === 'operators') {
            display.innerText = keyValue;
        } else {
            display.innerText = displayValue + keyValue
        }
    }
    if(type === 'operators'){
        const operatorKeys = keys.querySelectorAll('[data-type="operators"]')
        operatorKeys.forEach(x=>x.dataset.state = '')
        key.dataset.state = 'selected'

        calculator.dataset.firstNumber = displayValue;
        calculator.dataset.operator = key.dataset.key;
    }

    if(type === "equal"){
        const firstNumber =  calculator.dataset.firstNumber;
        const operator = calculator.dataset.operator;
        const secondNumber = displayValue;

        // console.log(firstNumber,operator,secondNumber)
        return display.textContent = finalResult([firstNumber,secondNumber],operator).toString();
    }

    calculator.dataset.previousKeyType = type;
})