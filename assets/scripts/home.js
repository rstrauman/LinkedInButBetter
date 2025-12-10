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
  function checkUser() {
  const currentuser = localStorage.getItem('currentuser');
  const pfinfo = select('.profile-info-bg');
  const pfdiv = create('div');
    addClass(pfdiv,'profile-card');
  if (currentuser === 'daniel') {
    pfdiv.innerHTML = `
    <img class="profile-banner" src="../media/banner-1.jpg" alt="profile banner">
    <img class="profile-image" src="../media/headshot.png" alt="profile picture">
    <h2 class="fullname">Daniel Zhang</h2>
    <p class="profession">Gamer</p>
    <p class="location">Winnipeg, Manitoba</p>
    <p class="bio">I game!.</p>
    `
  } else if (currentuser === 'riley') {
    pfdiv.innerHTML = `
    <img class="profile-banner" src="../media/banner-1.jpg" alt="profile banner">
    <img class="profile-image" src="../media/headshot.png" alt="profile picture">
    <h2 class="fullname">Riley Strauman</h2>
    <p class="profession">Software Developer</p>
    <p class="location">Winnipeg, Manitoba</p>
    <p class="bio">Aspiring Software Developer. Studying at Manitoba Institute of Trades and Technology.</p>`
  } else {
    pfdiv.innerHTML = `
    <img class="profile-banner" src="../media/banner-1.jpg" alt="profile banner">
    <img class="profile-image" src="../media/headshot.png" alt="profile picture">
    <h2 class="fullname">Somebody</h2>
    <p class="profession">Some job</p>
    <p class="location">Somewhere</p>
    <p class="bio">Doing Something.</p>`
  }
    pfinfo.appendChild(pfdiv);
  };
  checkUser();

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

})
