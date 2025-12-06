'use strict';
import { 
    getElement, 
    select, 
    selectAll, 
    listen,
    addClass,
    removeClass,
    toggleClass,
    create
} from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  //randomUser APi

const URL = 'https://randomuser.me/api/?nat=CA&results=10&seed=same';

const options = {
  methods: 'GET',
  headers: {
    'Content-Type': 'application/JSON; charset=UTF-8'
  },
  mode: 'cors'
}

async function getUsers(endpoint) {
  try {
    const result = await fetch(endpoint, options);
    if(!result.ok) {
      throw new Error(`${result.statusText}(${result.statusText})`)
    }
    const data = await result.json();
    return data.results;
  } catch(error) {
    console.log(error.mesage);
  }
}

 async function displayUser() {
  const displaybox = select('.person-card');
  const users = await getUsers(URL);

  users.forEach(user => {
    const div = create('div');
    addClass(div,'user-card');
    div.innerHTML = `
    <img src='${user.picture.large}' alt='user image'>
    <h2>${user.name.title} ${user.name.first} ${user.name.last}</h2>
    <p>${user.location.city}</p>
    <i class="fa-solid fa-circle-plus"></i>
    `
    displaybox.appendChild(div);
  } )
}
displayUser();
})