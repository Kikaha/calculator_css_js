
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

    if(type === 'clear'){
        display.textContent = '0';
        delete calculator.dataset.firstNumber;
        delete calculator.dataset.operator;
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

//TEST PART

function clearCalculator(){
    const clearKey = document.querySelector('[data-type="clear"]');
    clearKey.click();
}
function testClear(){
    clearCalculator();
    console.assert(display.textContent === '0', 'Clear key.Display should be 0');
    console.assert(!calculator.dataset.firstNumber, 'Clear key. No dataset remains');
    console.assert(!calculator.dataset.operator, 'Clear key. No dataset remains');
}

const one = document.querySelector('[data-key="1"]');
const five = document.querySelector('[data-key="5"]');
const nine = document.querySelector('[data-key="9"]');

function testKeySequence(test){
    test.keys.forEach(key=>{
        document.querySelector(`[data-key="${key}"]`).click();
    })
    console.assert(display.textContent === test.value, test.message)
    clearCalculator();
    testClear();
}

const tests = [{
    keys: ['1'],
    value: '1',
    message: 'Click 1'
},
{
    keys: ['1','5'],
    value: '15',
    message: 'Click 15'
},
{
    keys: ['1','5','9'],
    value: '159',
    message: 'Click 159'
}];

tests.forEach(x=>testKeySequence(x));
tests.forEach(testKeySequence);

// //One test
// one.click();
// console.assert(display.textContent === '1', "Clicked One")
// clearCalculator();
// testClear();

// //15
// one.click();
// five.click();
// console.assert(display.textContent === '15', "Clicked 1 and 5")
// clearCalculator();
// testClear();

// //159
// one.click();
// five.click();
// nine.click();
// console.assert(display.textContent === '15', "Clicked 1 and 5")
// clearCalculator();
// testClear();

// //sequence
// testKeySequence(1,2,3);