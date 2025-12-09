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

let modal = select('#modal');
let logoutModal = getElement('logout-modal');
let modalContent = select('.modal-content');

let modalIsOpen = false;

document.addEventListener('DOMContentLoaded', () => {
  //randomUser APi

const URL = 'https://randomuser.me/api/?nat=US,CA&results=10&seed=same';

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
    <img class="users-img" src='${user.picture.large}' alt='user image'>
    <div class="flex-col users-info">
      <h2 class="users-name">${user.name.title} ${user.name.first} ${user.name.last}</h2>
      <p class="users-city">${user.location.city}</p>
    </div>
    <i id="plus" class="fa-solid fa-plus"></i>
    `
    displaybox.appendChild(div);
  } )
}
displayUser();
})

function openModal(){
    modalIsOpen = true;
    modal.classList.remove('hidden');
    modalContent.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
    modalContent.classList.add('hidden');
}

listen('click', logoutModal, openModal);
modal.addEventListener('click', (e) => {
  if(!modalContent.contains(e.target)){
    closeModal();
  }
});