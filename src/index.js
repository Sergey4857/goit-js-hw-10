import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';

import _debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputEL = document.querySelector('input#search-box');

inputEL.addEventListener('input', _debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(evt) {
  fetchCountries(evt.target.value.trim())
    .then(info => {
      if (info.length > 10) {
        console.log('Введи больше букав');
      } else if (info.length >= 2 && info.length <= 10) {
        console.log(info);
        console.log('Тут будет разметка от2х до 10');
      } else if (info.length === 1) {
        console.log(info);
        console.log('Тут будет разметка для 1й страны');
      } else {
        console.log(info);
      }
    })
    .catch(error => alert('Oops, there is no country with that name'));
}
