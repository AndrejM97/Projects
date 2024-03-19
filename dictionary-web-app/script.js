'use strict';

const userInput = document.getElementById('input');
let word = "";
const searchedWordWrapper = document.getElementById('searched__word');
const switchBtn = document.getElementById('toggle');
const popup = document.querySelector('.popup');
const dropdownEl = document.querySelector('.dropdown');
const iconArrowEl = document.querySelector('.icon__arrow');

userInput.addEventListener('keyup', function (e) {
    word = e.target.value;

    const userKey = e.key;
    if (userKey === 'Enter') {
        searchedWordWrapper.innerHTML = '';
        if (word === '') {
            userInput.classList.add('error');
            popup.classList.remove('hidden');
            popup.textContent = `word can't be empty`;
        } else {
            userInput.value = '';
            userInput.classList.remove('error');
            popup.classList.add('hidden');
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Your searched word doesnt exist');
                    }
                    return response.json();
                })
                .then((data) => {

                    const phoneticsHtml = data[0].phonetics
                        .filter(audio => audio.audio !== '')
                        .map(audio => `
                            <img src="/dictionary-web-app/images/icon-play.svg" alt="play button" data-audio="${audio.audio}" class="audio">
                        `).join('');

                    const definition = `${data[0]?.meanings[0]?.definitions
                        ?.filter(definition => definition.definition !== undefined)
                        ?.map((definition) => `<li>${definition.definition}</li>`)
                        .join('')}`;

                    const example = `${(data[0]?.meanings[0]?.definitions
                        .filter(definition => definition.example !== undefined))
                        .map(definition => `<p class="quotes">"${definition.example}"</p>`)
                        .join('')}`;



                    const def = `${data[0]?.meanings[0]?.definitions
                        ?.filter(definition => definition.definition !== undefined)
                        ?.map((definition) => `<li>${definition.definition}</li>`)
                        .join('')}`;



                    const noun = data[0]?.meanings[0]?.partOfSpeech ? `<p>${data[0].meanings[0].partOfSpeech}</p>` : '';
                    const verb = data[0]?.meanings[1]?.partOfSpeech ? `<p>${data[0].meanings[1].partOfSpeech}</p>` : '';


                    const url = data[0].sourceUrls.map(url => `<a href="${url}">${url}</a>`).join('');

                    const html = `
                        <div class="flex">
                        <div class="block">
                            <h1 class="header">${data[0].word}</h1>
                            <p class="blue light">${data[0].phonetic}</p>
                        </div>
                          <p>${phoneticsHtml}</p>
                          </div>
                        <div class="noun">
                            <p>${noun}</p>
                        </div>
                        <ul class="meaning">
                            <p>Meaning</p>
                           ${def}
                        </ul>
                        <div class="synonyms">
                            <p class="synonym">Synonyms</p>
                            <p class="blue">${data[0].meanings[0].synonyms?.slice(0, 5)?.join(', ')}</p>
                        </div>
                        <div class="verb">
                            <p>${verb}</p>
                        </div>
                        <ul class="meaning">
                            <p>Meaning</p>
                           ${definition}
                        </ul>
                       
                        
                        <ul class="meaning example">
                            ${example}
                        </ul>
                        <div class="line"></div>
                        <div class="sources">
                            <p class="source">Source<span>${url}</span></p>
                           <img src="/dictionary-web-app/images/icon-new-window.svg" alt="new window">
                          </div>
                    `;

                    searchedWordWrapper.insertAdjacentHTML('beforeend', html);

                    const playButtons = searchedWordWrapper.querySelectorAll('[data-audio]');
                    playButtons.forEach(button => {
                        button.addEventListener('click', function () {
                            const audioUrl = this.getAttribute('data-audio');
                            const audioElement = new Audio(audioUrl);
                            audioElement.play();
                        });
                    });
                })
                .catch((error) => {
                    popup.classList.remove('hidden');
                    popup.textContent = error.message;
                });
        }
    }
});


switchBtn.addEventListener('click',function(){
    document.body.classList.toggle('dark-mode');
});


iconArrowEl.addEventListener('click',function(){
    dropdownEl.classList.toggle('hidden');
})

const sansSerifEl = document.getElementById('sans__serif');
const monoEl = document.getElementById('mono');
const serifEl = document.getElementById('serif');

sansSerifEl.addEventListener('click',function(){
    document.body.style.fontFamily = 'sans-serif';
})

monoEl.addEventListener('click',function(){
    document.body.style.fontFamily = 'monospace';
})

serifEl.addEventListener('click',function(){
    document.body.style.fontFamily = 'serif';
})