const countriesEl = document.getElementById('countries');
const toggleBtn = document.getElementById('toggle');
const filterBtn = document.getElementById('filter');
const searchEl = document.getElementById('search');
const regionFilters = document.querySelectorAll('li');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');


getCountries();

async function getCountries() {
    const res = await fetch('https://restcountries.com/v2/all');
    const countries = await res.json();

    displayCountries(countries);
}



function displayCountries(countries) {
    countriesEl.innerHTML = '';

    countries.forEach(country => {
        const countryEl = document.createElement('div');
        countryEl.classList.add('card');
    
        countryEl.innerHTML = `
            <div>
                <img src="${country.flag}" alt="${country.name}">
            </div>
            <div class="country-body">
                <h3 class="country-name">${country.name}</h3>
                <p><strong>Population:</strong> ${country.population}</p>
                <p class="country-region"><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital}</p>
            </div>
        `
        countryEl.addEventListener('click', () => {
            modal.style.display = 'flex';
            showCountryDetails(country);
        });
        countriesEl.appendChild(countryEl);
    });
};

function showCountryDetails(country) {
    const modalBody = modal.querySelector('.modal-body'); 
    const modalImg = modal.querySelector('img');

    modalImg.src = country.flag;
    modalBody.innerHTML = `
        
        <ul>
            <h3>${country.name}</h3>
            <li><p><strong>Native Name:</strong> ${country.nativeName}</p></li>
            <li><p><strong>Population:</strong> ${country.population}</p></li>
            <li><p><strong>Region:</strong> ${country.region}</p></li>
            <li><p><strong>Sub Region:</strong> ${country.subregion}</p></li>
        </ul>
        <ul>
            <li><p><strong>Capital:</strong> ${country.capital}</p></li>
            <li><p><strong>Top Level Domain:</strong> ${country.topLevelDomain}</p></li>
            <li><p><strong>Currencies:</strong> ${country.currencies.map(currency => currency.name)}</p></li>
            <li><p><strong>Languages:</strong> ${country.languages.map(language => language.name)}</p></li>
        </ul>  
    `
}

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark')
});

filterBtn.addEventListener('click', () => {
    filterBtn.classList.toggle('open');
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

searchEl.addEventListener('input', e => {
    const {value} = e.target;

    const countryName = document.querySelectorAll('.country-name');

    countryName.forEach(name => {
        console.log(name.innerText)
        if(name.innerText.toLowerCase().includes(value.toLowerCase())) {
            name.parentElement.parentElement.style.display = 'block';
        }else{
            name.parentElement.parentElement.style.display = 'none'
        };
    });
});
regionFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        const value = filter.innerText;
        const countryRegion = document.querySelectorAll('.country-region');

        countryRegion.forEach(region => {
            if(region.innerText.includes(value) || value === 'All') {
                region.parentElement.parentElement.style.display = 'block';
            }else{
                region.parentElement.parentElement.style.display = 'none';
            }
        });
    });
});

