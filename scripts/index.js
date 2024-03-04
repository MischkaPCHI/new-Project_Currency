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

const responseFromServerPromise = (q) => {
    return fetch (q);
}

const serverWorksGBP = async (q) => {
    const serverResponse = await responseFromServerPromise(q);
    const body = await serverResponse.json();
    console.log(body.rates);
    return body.rates;
}
serverWorksGBP('https://openexchangerates.org/api/latest.json?app_id=c56da6a380da489ea5745895577c2ac4');

const serverWorksUSD = async (q) => {
    const serverResponse = await responseFromServerPromise(q);
    const body = await serverResponse.json();
    console.log(body.rates.USD);
    return body.rates.USD;
}
serverWorksUSD('https://openexchangerates.org/api/latest.json?app_id=c56da6a380da489ea5745895577c2ac4');

function pushToHtml (elem) {
    const container = document.querySelector('#info');
    const element = document.createElement('li');
    element.textContent = elem;
    container.append(element);
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
    switch(userInputConvertFrom){
        case 'GBP': firstRate = serverWorksGBP('https://openexchangerates.org/api/latest.json?app_id=c56da6a380da489ea5745895577c2ac4');
        break;
        case 'USD': firstRate = serverWorksUSD('https://openexchangerates.org/api/latest.json?app_id=c56da6a380da489ea5745895577c2ac4');
        break;
        default:
            firstRate = 1;
    }

    switch(userInputConvertTo){
        case 'GBP': secondRate = serverWorksGBP('https://openexchangerates.org/api/latest.json?app_id=c56da6a380da489ea5745895577c2ac4');
        break;
        case 'USD': secondRate = serverWorksUSD('https://openexchangerates.org/api/latest.json?app_id=c56da6a380da489ea5745895577c2ac4');
        break;
        default:
            secondRate = 1;
    }
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