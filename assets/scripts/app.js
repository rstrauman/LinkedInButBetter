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

const login = select('.login');
const header = select('.header-left');
const loginside = select('.login-side');
const regside = select('.reg-side');
const contentpart = select('.main-container');
const footer = select('footer');
const wronginfo = select('.wrong-info');
const usernameinput = getElement('username');
const passwordinput = getElement('password');
const inputbox = select('.input-box');
const signup = select('.signup');
const backtologin = select('.backtologin');
const reguser = select('.reg-user');
const regpass = select('.reg-pass');
const reginfo = select('.reg-info');
const submit = select('.submit');
const watermark = select('.watermark');
usernameinput.value = '';
passwordinput.value = '';
let matched = false;

const users = JSON.parse(localStorage.getItem('users')) || [
  { username: 'daniel', password: 'daniel123' },
  { username: 'riley', password: 'riley123' }
];

function matchCred() {
  const typedUser = usernameinput.value;
  const typedPass = passwordinput.value;

  for( let i = 0; i < users.length; i++) {
    if (typedUser === users[i].username && typedPass === users[i].password) {
      matched = true;
      break;
    } 
  }
}

function regUser() {
  const regU = reguser.value;
  const regP = regpass.value;
  users.push({ username: regU, password: regP });

}
localStorage.setItem('users', JSON.stringify(users));

listen('click', login, () => {
  matchCred();
  if(!matched) {
    wronginfo.innerText = 'Incorrect username or password';
    usernameinput.value = '';
    passwordinput.value = '';
  } else {
    wronginfo.innerText = '';
    window.location.href = './assets/pages/home.html';
    usernameinput.value = '';
    passwordinput.value = '';
  }
})
inputbox.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    matchCred();
    if(!matched) {
      wronginfo.innerText = 'Incorrect username or password';
      usernameinput.value = '';
      passwordinput.value = '';
    } else {
      wronginfo.innerText = '';
      window.location.href = './assets/pages/home.html';
      usernameinput.value = '';
      passwordinput.value = '';
    }
} 
})

listen('click', signup, () => {
  addClass(header, 'flyright');
  removeClass(header, 'flyleft');
  addClass(contentpart, 'regfly');
  removeClass(contentpart, 'flyright');
  addClass(header, 'header-right');
  removeClass(header, 'header-left');
  addClass(loginside, 'invisible');
  removeClass(regside, 'invisible');
  addClass(contentpart, 'moveleft');
  removeClass(footer, 'rightiszero');
  addClass(header, 'moveright');
  removeClass(watermark, 'textalignright');
  addClass(watermark, 'textalignleft');
  reguser.value = '';
  regpass.value = '';
})

listen('click', backtologin, () => {
  addClass(header, 'flyleft');
  addClass(contentpart, 'flyright');
  removeClass(contentpart, 'regfly');
  removeClass(header, 'flyright');
  removeClass(header, 'header-right');
  addClass(header, 'header-left');
  removeClass(loginside, 'invisible');
  addClass(regside, 'invisible');
  removeClass(contentpart, 'moveleft');
  addClass(footer, 'rightiszero');
  removeClass(header, 'moveright');
  addClass(watermark, 'textalignright');
  removeClass(watermark, 'textalignleft');
  usernameinput.value = '';
  passwordinput.value = '';
})

listen('click', submit, () => {
  regUser();
  reginfo.innerText = 'Registered successfully!';
  reguser.value = '';
  regpass.value = '';
  setTimeout(() => {
    reginfo.innerText = '';
  },1000)
})

// listen('animationend', header, ()=> {
//   header.style.backgroundImage = 'url=(../media/login-banner2.png)';
// })
})