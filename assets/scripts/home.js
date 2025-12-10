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

const modal = select('#modal');
const logoutModal = getElement('logout-modal');
const modalContent = select('.modal-content');
let postsContainer = select('.post-flex-container');

let modalIsOpen = false;

document.addEventListener('DOMContentLoaded', () => {
  function checkUser() {
  const currentuser = localStorage.getItem('currentuser');
  const pfinfo = select('.profile-info-bg');
  const pfdiv = create('div');
  const postimg = select('.post-profile-img');
  const navImg = getElement('logout-modal');
  const connections = getElement('connections');
  const followers = getElement('followers');  
    addClass(pfdiv,'profile-card');
  if (currentuser === 'daniel') {
    pfdiv.innerHTML = `
    <img class="profile-banner" src="../media/banner-1.jpg" alt="profile banner">
    <img class="profile-image" src="../media/gamer.png" alt="profile picture">
    <h2 class="fullname">Daniel Zhang</h2>
    <p class="profession">Gamer</p>
    <p class="location">Winnipeg, Manitoba</p>
    <p class="bio">I game!.</p>
    `
    postimg.innerHTML = `<img class="post-profile-photo" src="../media/gamer.png" alt="Profile Image">
                                <div id="new-post">Start a Post</div>`
    navImg.innerHTML = `<img id="nav-img" src="../media/gamer.png" alt="profile-picture=img">
                        <p>Me ⯆</p>`
    followers.textContent = "6969";
    connections.textContent = "67";
  } else if (currentuser === 'riley') {
    pfdiv.innerHTML = `
    <img class="profile-banner" src="../media/banner-1.jpg" alt="profile banner">
    <img class="profile-image" src="../media/headshot.png" alt="profile picture">
    <h2 class="fullname">Riley Strauman</h2>
    <p class="profession">Software Developer</p>
    <p class="location">Winnipeg, Manitoba</p>
    <p class="bio">Aspiring Software Developer. Studying at Manitoba Institute of Trades and Technology.</p>`
    postimg.innerHTML = `<img class="post-profile-photo" src="../media/headshot.png" alt="Profile Image">
                                <div id="new-post">Start a Post</div>`
    navImg.innerHTML = `<img id="nav-img" src="../media/headshot.png" alt="profile-picture=img">
                        <p>Me ⯆</p>`
    followers.textContent = "14";
    connections.textContent = "45";
  } else {
    pfdiv.innerHTML = `
    <img class="profile-banner" src="../media/banner-1.jpg" alt="profile banner">
    <img class="profile-image" src="../media/nobody.png" alt="profile picture">
    <h2 class="fullname">Somebody</h2>
    <p class="profession">Some job</p>
    <p class="location">Somewhere</p>
    <p class="bio">Doing Something.</p>`;
    postimg.innerHTML = `<img class="post-profile-photo" src="../media/nobody.png" alt="Profile Image">
                                <div id="new-post">Start a Post</div>`
    navImg.innerHTML = `<img id="nav-img" src="../media/nobody.png" alt="profile-picture=img">
                        <p>Me ⯆</p>`
    followers.textContent = "0";
    connections.textContent = "0";
  }
    pfinfo.appendChild(pfdiv);
  };
  checkUser();

  const startPostBtn = getElement('new-post');
  const postModal = getElement('post-modal');
  const postModalContent = select('.post-modal-content');
  const postModalImg = select('.modal-picture');
  const postcontainer = select('.post-container');

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

function openPostModal(){
    postModal.classList.remove('hidden');
    postModalContent.classList.remove('hidden');
    postModalImg.classList.remove('hidden');

    postModalContent.innerHTML = `
                                  <form>
                                    <textarea class="post-text-area" placeholder="What's on your mind?" rows="4" cols="50"></textarea>
                                    <div class="post-btn">Post</div>
                                  </form>
    `

    const postBtn = select('.post-btn');
    listen('click', postBtn, () => {
      post();
    });
}

postModal.addEventListener('click', (e) => {
  if(!postModalContent.contains(e.target)){
    closePostModal();
  }
});

function closePostModal(){
    addClass(postModal, 'hidden');
    addClass(postModalContent, 'hidden');
    addClass(postModalImg, 'hidden');
}

function post() {
  const currentuser = localStorage.getItem('currentuser');
  const textInput = select('.post-text-area');
    let text = textInput.value.trim();
    
    if(!text) return; 

        let postDiv = document.createElement('div');
        postDiv.classList.add('post-container');
        
        let postProfileInfo = document.createElement('div');
        postProfileInfo.classList.add('post-user-info');
        postProfileInfo.innerHTML = `
            <img src="./assets/media/sunset.jpeg" class="post-pfp">
            <div class="post-user-name">Riley</div>
        `;
        postDiv.appendChild(postProfileInfo);

        let postDate = document.createElement('div');
        postDate.classList.add('post-date');
        let now = new Date().toLocaleString();
        if(text) {
          if(currentuser === 'riley') {
            postDiv.innerHTML = `
                                  <div class="user-info-post">
                                    <div class="left-side-post">
                                        <img src="../media/headshot.png" alt="Bill Gates Profile Picture">
                                        <div class="col-flex">
                                            <p class="post-name">${currentuser}</p>
                                            <p class="job-title">Software Developer</p>
                                        </div>
                                    </div>
                                    <div class="right-side-post">
                                        <div class="col-flex">
                                            <i class="fa-solid fa-ellipsis"></i>
                                            <p class="date-and-time">${now}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="post-content">
                                    <p>${text}</p>
                                </div>
                                <div class="post-actions">
                                    <p><i class="fa-regular fa-heart"></i> 0</p>
                                    <p><i class="fa-regular fa-comment"></i> 0</p>
                                    <i class="fa-solid fa-share-from-square"></i>`
          }
          if(currentuser === 'daniel') {
            postDiv.innerHTML = `
                                  <div class="user-info-post">
                                    <div class="left-side-post">
                                        <img src="../media/gamer.png" alt="Bill Gates Profile Picture">
                                        <div class="col-flex">
                                            <p class="post-name">${currentuser}</p>
                                            <p class="job-title">Gamer</p>
                                        </div>
                                    </div>
                                    <div class="right-side-post">
                                        <div class="col-flex">
                                            <i class="fa-solid fa-ellipsis"></i>
                                            <p class="date-and-time">${now}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="post-content">
                                    <p>${text}</p>
                                </div>
                                <div class="post-actions">
                                    <p><i class="fa-regular fa-heart"></i> 0</p>
                                    <p><i class="fa-regular fa-comment"></i> 0</p>
                                    <i class="fa-solid fa-share-from-square"></i>`
          }
          if(currentuser != 'riley' && currentuser != 'daniel') {
            alert('You Dont Have Permission to Post!');
            return;
          };
        }



        postsContainer.prepend(postDiv);
        textInput.value = "";
         closePostModal();
        
}

listen('click', startPostBtn,  openPostModal);


})
