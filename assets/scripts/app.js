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
const wronginfo = select('.wrong-info');
const usernameinput = getElement('username');
const passwordinput = getElement('password');
const inputbox = select('.input-box');
const signup = select('.signup');
const regdialog = select('.reg-dialog');
const close = select('.close');
const reginfo = select('.reg-info');
const submit = select('.submit');
usernameinput.value = '';
passwordinput.value = '';
let matched = false;

class Client{
  #username;
  #password;

  constructor(username, password) {
    this.#username = username;
    this.#password = password;
  }

  get username() {return this.#username};
  get password() {return this.#password};
}

const user = [
  new Client('daniel', 'daniel123'),
  new Client('riley', 'riley123')
];
localStorage.setItem('user', JSON.stringify(user));

function matchCred() {
  const typedUser = usernameinput.value;
  const typedPass = passwordinput.value;

  for( let i = 0; i < user.length; i++) {
    if (typedUser === user[i].username && typedPass === user[i].password) {
      matched = true;
      break;
    } 
  }
}

// function getUserData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (!userOne) {
//         reject(new Error('User does not exist'));
//       } else {
//         resolve(userOne);
//       }
//     }, 5000);
//   });
// }

// function greetUser(user) {
//   console.log(`Hello, ${user.username}`);
// }

// function errormsg(error) {
//   console.log(error.message);
// }

// async function result() {
//   try {
//     const user = await getUserData();
//     greetUser(user);
//   } catch (error) {
//     errormsg(error);
//   } finally {
//     console.log('nice to meet you');
//   }
// }

// result();

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
})

listen('click', close, () => {
  regdialog.close();
})

listen('click', submit, () => {
  reginfo.innerText = 'Registered successfully!';
  setTimeout(() => {
    reginfo.innerText = '';
    regdialog.close();
  },3000)
})

})