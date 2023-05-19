import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';

import _debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEL: document.querySelector('input#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputEL.addEventListener(
  'input',
  _debounce(onInputChange, DEBOUNCE_DELAY)
);

function onInputChange(evt) {
  fetchCountries(evt.target.value.trim())
    .then(info => {
      if (info.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (info.length >= 2 && info.length <= 10) {
        createMarkupManyCountries(info);
      } else if (info.length === 1) {
        console.log(info);

        createMarkupOneCountry(info);
      } else {
        console.log(info);
      }
    })
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function createMarkupManyCountries(info) {
  console.log(info);
  const markup = info
    .map(({ flags, name }) => {
      return `
      <li class="country-item"><img src="${flags.svg}" width="60" height= "40"></img>
          <p class="country-text">${name.official}</p></li>`;
    })
    .join('');
  refs.countryList.innerHTML = markup;
}

function createMarkupOneCountry(info) {
  const markup = info
    .map(({ flags, name, capital, population, languages }) => {
      return `
 
        <div class='country-name'>
          <img width="55"
            src='${flags.svg}'>
          <p> ${name.official}</p>
        </div>
        <p><b>Capital</b>: ${capital}</p>
        <p><b>Population</b>: ${population}</p>
        <p><b>Languages</b>: ${Object.values(languages)}</p>`;
    })
    .join('');
  refs.countryInfo.innerHTML = markup;
}
