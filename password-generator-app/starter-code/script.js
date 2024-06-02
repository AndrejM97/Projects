"use strict";

const passwordEl = document.getElementById('password');
const generateBtn = document.querySelector('.generate__btn');
const range = document.getElementById('range');
const characterLengthEl = document.querySelector('.characterLengthEl');
const securityTextEl = document.querySelector('.security__text');
const copyEl = document.querySelector('.copy');


let upperCaseChecked = false;
let lowerCaseChecked = false;
let numbersChecked = false;
let symbolsChecked = false;



function generatePassword(length) {
    let password = '';

    if (upperCaseChecked) password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowerCaseChecked) password += 'abcdefghijklmnopqrstuvwxyz';
    if (numbersChecked) password += '0123456789';
    if (symbolsChecked) password += '!@#$%^&*()_+{}|:"<>?-=[]\;\',./';

    let passwordCharacters = password.split('');
    let passwordLength = passwordCharacters.length;

    if (passwordLength === 0) return 'select at least one option';

    let generatedPassword = '';

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * passwordLength);
        generatedPassword += passwordCharacters[randomIndex];
    }

    return generatedPassword;
}



const upperCaseLetters = document.getElementById('upperCaseLetters');
const lowerCaseLetters = document.getElementById('lowerCaseLetters');
const numbers = document.getElementById('numbers');
const symbolCheckBox = document.getElementById('symbols');

upperCaseLetters.addEventListener('click', function () {
    upperCaseChecked = upperCaseLetters.checked;
});

lowerCaseLetters.addEventListener('click', function () {
    lowerCaseChecked = lowerCaseLetters.checked;
});

numbers.addEventListener('click', function () {
    numbersChecked = numbers.checked;
});

symbolCheckBox.addEventListener('click', function () {
    symbolsChecked = symbolCheckBox.checked;
});

generateBtn.addEventListener('click',function (){
    if(characterLengthEl.textContent > 0){
        passwordEl.textContent = generatePassword(range.value * 0.2);
        document.body.style.background = '';
    } else {
        document.body.style.background = 'gray';
    }

});


function changeSecurityText(){
    characterLengthEl.textContent = Math.ceil(range.value * 0.2);
    if(characterLengthEl.textContent <= 4){
        displaySecurityText('TOO WEAK');
        addBarsColor(1,'red','');
    } else if(characterLengthEl.textContent <= 6) {
        displaySecurityText('WEAK');
        addBarsColor(2,'darkorange','');
    } else if(characterLengthEl.textContent <= 10) {
        displaySecurityText('MEDIUM');
        addBarsColor(3,'orange','');
    } else {
        displaySecurityText('STRONG');
        addBarsColor(4,'green','');
    }
}

function displaySecurityText(text){
    securityTextEl.textContent = text;
}

function addBarsColor(number, color, empty) {
    const bars = document.querySelectorAll('.security__bars');
    bars.forEach((bar, index) => {
        if (index < number) {
            bar.style.backgroundColor = color;
        } else {
            bar.style.backgroundColor = empty;
        }
    });
}


let copiedMessage = null;

copyEl.addEventListener('click', function () {
    if(passwordEl.textContent !== 'select at least one option' ){
        copyTextToClipboard(passwordEl.textContent);

        if(!copiedMessage){

            const li = document.createElement('li');

            li.innerHTML = `
            <div class="box">
                <p>copied to clipboard</p>
                <i class="fa-solid fa-x close"></i>
            </div>`;

            document.body.appendChild(li)
            copiedMessage = li;

            setTimeout(function() {
                copiedMessage.remove();
                copiedMessage = null;
            }, 5000);

            const closeButton = li.querySelector('.close');
            closeButton.addEventListener('click', function() {
                copiedMessage.remove();
                copiedMessage = null;
            });
        }
    }


});

function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text);
}

range.addEventListener('mousemove',function(){
    changeSecurityText();
})

range.addEventListener('touchmove',function(){
    changeSecurityText();
})