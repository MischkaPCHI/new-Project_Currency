const currencyValue = document.querySelector('.value-input')
const convertFrom = document.querySelector('#cur1');
const convertTo = document.querySelector('#cur2');

const result = document.querySelector('#result');

const createButtonElement = document.querySelector("#calculate");
const resetButtonElement = document.querySelector("#clear");
const alertSound = document.querySelector('#alertSound');
const alertSound2 = document.querySelector('#alertSound2');

let userInputCurrencyValue;
let userInputConvertFrom;
let userInputConvertTo;
let rates;

const responseFromServerPromise = (q) => {
    return fetch (q);
}

const serverWorksGBP = async (q) => {
    const serverResponse = await responseFromServerPromise(q);
    const body = await serverResponse.json();
    rates = body.rates;
    pushToHtml(rates);
    convertCurrency();
}
serverWorksGBP('https://openexchangerates.org/api/latest.json?app_id=c56da6a380da489ea5745895577c2ac4');

function pushToHtml (elem) {
    for (let key in elem) {
    const elementFrom = document.createElement('option');
    const elementTo = document.createElement('option');
    elementFrom.textContent = key;
    elementTo.textContent = key;
    convertFrom.append(elementFrom);
    convertTo.append(elementTo);
    }
}

const inputFieldCurrencyValue = (evt) => {
    userInputCurrencyValue = evt.target.value;
    if(isNaN(userInputCurrencyValue)){
        showAlertNaN();
    }
}

const inputFieldConvertFromAndTo = (evt) => {
    if(evt.target.id === 'cur1'){
        userInputConvertFrom = evt.target.value;
    }
    if(evt.target.id === 'cur2'){
        userInputConvertTo = evt.target.value;
    }
}

const showAlertNaN = () => {
    if (alertSound2.canPlayType) {
        alertSound2.play();
        alert("Лось! Введи сумму!");
    }
}

function convertCurrency(evt) {
    evt.preventDefault();
    if (!userInputCurrencyValue){
        showAlertWithSound();
        return;
    } 
    let firstRate = rates[userInputConvertFrom] || 1;
    let secondRate = rates[userInputConvertTo] || 1;

    console.log(firstRate);
    console.log(secondRate);

    result.textContent = (userInputCurrencyValue / firstRate) * secondRate;   

}


const resetButtonHandler = () => {
    let resetResult = "";
    userInputCurrencyValue = ""; 
    result.textContent = resetResult;
    userInputCurrencyValue.textContent = userInputCurrencyValue;
}

const showAlertWithSound = () => {
   if (alertSound.canPlayType) {
        alertSound.play();
        alert("Лось! Введи сумму!");
    }
}

currencyValue.addEventListener('input', inputFieldCurrencyValue);
convertFrom.addEventListener('input', inputFieldConvertFromAndTo);
convertTo.addEventListener('input', inputFieldConvertFromAndTo);

createButtonElement.addEventListener('click', convertCurrency);
resetButtonElement.addEventListener('click', resetButtonHandler);
