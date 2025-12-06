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
const wronginfo = select('.wrong-info');
const usernameinput = getElement('username');
const passwordinput = getElement('password');
const inputbox = select('.input-box');
const signup = select('.signup');
const regdialog = select('.reg-dialog');
const reguser = select('.reg-user');
const regpass = select('.reg-pass');
const close = select('.close');
const reginfo = select('.reg-info');
const submit = select('.submit');
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
  regdialog.showModal();
  reguser.value = '';
  regpass.value = '';
})

listen('click', close, () => {
  regdialog.close();
})

listen('click', submit, () => {
  regUser();
  reginfo.innerText = 'Registered successfully!';
  reguser.value = '';
  regpass.value = '';
  setTimeout(() => {
    reginfo.innerText = '';
    regdialog.close();
  },1000)
  addClass(regdialog, 'flyingdata');
  setTimeout(() => {
    removeClass(regdialog, 'flyingdata');
    regdialog.close();
  }, 1000)
  addClass(header, 'switchbackground');
  setTimeout(() => {
    removeClass(header, 'switchbackground');
    regdialog.close();
  }, 2000)
})

listen('animationend', header, ()=> {
  header.style.backgroundImage = 'url=(../media/login-banner2.png)';
})
})