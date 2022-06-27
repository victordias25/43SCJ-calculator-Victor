const display = document.querySelector('#display');
const keys = document.querySelectorAll('[id*=key]');
const operators = document.querySelectorAll('[id*=Operator]');


let newNumber = true;
let operator;
let previousNumber;

function updateDisplay(number) {
    if (newNumber) {
        display.textContent = number;
        newNumber = false;
    }
    else display.textContent += number;
}

const insertNumber = ({ target }) =>
    updateDisplay(target.textContent);

keys.forEach(key => key.addEventListener('click', insertNumber));

const selectOperator = (event) => {
    newNumber = true;
    operator = event.target.textContent;
    previousNumber = display.textContent;
}

operators.forEach(operator => operator.addEventListener("click", selectOperator));

const calculate = () => {
    
    const actualNumber = display.textContent;
    const a = parseFloat(actualNumber.toString().replace(',','.'));
    const b = parseFloat(previousNumber.toString().replace(',','.'));
    console.log(a);
    console.log(b);
    const result = eval(`${b}${operator}${a}`); //template string
    newNumber = true;
    updateDisplay(result.toString().replace('.',','));
}

const equal = document.querySelector("#equal");

equal.addEventListener('click', calculate);

const clearDisplay = () => display.textContent = "";

document.querySelector("#clearDisplay").addEventListener("click", clearDisplay);

const clearCalc = () => {
    clearDisplay();
    newNumber = true;
    operator = undefined;
    previousNumber = undefined;
};

document.querySelector("#clearCalc").addEventListener("click", clearCalc);

const removeLastNumber = () => {
    newNumber = true;
    updateDisplay(display.textContent.slice(0, -1));
}

document.querySelector("#backspace").addEventListener("click", removeLastNumber);

const invertSignal = () =>{
    newNumber = true;
    updateDisplay(display.textContent * -1);
}


document.querySelector("#inverter").addEventListener("click", invertSignal);

const somenteUmaVirgula = () =>{
    if(display.textContent==""){
        newNumber = true;
        updateDisplay(display.textContent = "0,");
    }
    else if(display.textContent.indexOf(",") == -1){
        newNumber = true;
        updateDisplay(display.textContent.concat(","));
    }else{        
        console.log("Somente uma virgula");
    }
    
}

document.querySelector("#decimal").addEventListener("click", somenteUmaVirgula);