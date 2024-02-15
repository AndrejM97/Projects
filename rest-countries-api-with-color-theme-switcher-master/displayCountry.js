'use strict';



    const selectedCountry = JSON.parse(localStorage.getItem('selectedCountry'));
    if (selectedCountry) {
        const {
            flag,
            name,
            population,
            region,
            capital,
            nativeName,
            subregion,
            topLevelDomain,
            currencies,
            languages,
            borders
        } = selectedCountry;
        document.getElementById('flag').src = flag;
        document.getElementById('nativeName').textContent = nativeName;
        document.getElementById('population').textContent = population;
        document.getElementById('region').textContent = region;
        document.getElementById('subregion').textContent = subregion;
        document.getElementById('population').textContent = capital;
        document.getElementById('countryName').textContent = name;
        document.getElementById('capital').textContent = capital;
        document.getElementById('topLevelDomain').textContent = topLevelDomain;
        document.getElementById('currencies').textContent = currencies.map(currency => currency.name);
        document.getElementById('languages').textContent = languages.flatMap(language => language.name);

        const bordersContainer = document.getElementById('borders');


        if (!borders || borders.length === 0) {
            bordersContainer.insertAdjacentHTML('beforeend', '<div class="border">-</div>');
        } else {
            borders.forEach(border => {
                const borderHtml = `<div class="border">${border}</div>`;
                bordersContainer.insertAdjacentHTML('beforeend', borderHtml);
            });
        }

    }



