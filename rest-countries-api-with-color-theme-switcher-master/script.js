'use strict';

const flagsWrapper = document.querySelector('.flags__wrapper');
let countriesData = [];

fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        return response.json();
    })
    .then(data => {
        countriesData = data;
        displayAllCountries();
    })
    .catch(error => {
        console.error('error:', error);
    });

const countryData = function(country) {

    const HTML = `
        <div class="flag__container">
            <div class="flag__img">
                <img src="${country.flags.png}" alt="${country.name} Flag">
            </div>
            <div class="flag__info">
                <h2>${country.name}</h2>
                <p class="bold">Population: <span>${country.population.toLocaleString()}</span></p>
                <p class="bold">Region: <span>${country.region}</span></p>
                <p class="bold">Capital: <span>${country.capital}</span></p>
            </div>
        </div>
    `;

    flagsWrapper.insertAdjacentHTML('beforeend', HTML);

}
function getFilteredCountries(region) {
    flagsWrapper.innerHTML = '';

    const countriesInRegion = countriesData.filter(country => country.region === region);

    countriesInRegion.forEach(country => {
        countryData(country);
    });
}

const filterButton = document.getElementById('filter__option');
filterButton.addEventListener('change', function() {

    const regionName = filterButton.value;
    getFilteredCountries(regionName);
});

function displayAllCountries(){
    flagsWrapper.innerHTML = '';

    countriesData.forEach(country => {
        countryData(country);
    })
}

flagsWrapper.addEventListener('click', function(event) {
    const chosenCountry = event.target.closest('.flag__container');
    const chosenCountryName = chosenCountry.querySelector('h2').textContent;
    const targetCountry = countriesData.find((country) => country.name === chosenCountryName);

    if (targetCountry) {
        localStorage.setItem('selectedCountry', JSON.stringify(targetCountry));
        window.location.href = 'country.html';
    }
});


