/*eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { signUp } from './signup';

//DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--loginform');
const signUpForm = document.querySelector('.form--signupForm');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password-update');

const bookBtn = document.getElementById('book-tour');

// VALUES

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

//console.log('hello from parcel');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    //console.log(email, password);
    login(email, password);
  });
}

if (signUpForm) {
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const confirmPassword = document.getElementById(
      'signUpConfirmPassword',
    ).value;
    //console.log(name, email, password);
    signUp(name, email, password, confirmPassword);
  });
}

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    // const email = document.getElementById('email').value;
    // const name = document.getElementById('name').value;
    //console.log(email, name);

    updateSettings(form, 'data');
  });
}

// if (userPasswordForm) {
//   loginForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const oldPassword = document.getElementById('password-current').value;
//     const newPassword = document.getElementById('password').value;
//     const confirmPassword = document.getElementById('password-confirm').value;

//     updateSettings({ oldPassword, newPassword, confirmPassword }, 'password');
//   });
// }

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const oldPassword = document.getElementById('password-current').value;
    const newPassword = document.getElementById('password').value;
    const confirmPassword = document.getElementById('password-confirm').value;
    //console.log(oldPassword, newPassword, confirmPassword);
    await updateSettings(
      { oldPassword, newPassword, confirmPassword },
      'password',
    );

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

// if (logOutBtn) {
//   logOutBtn.addEventListener('click', (event) => {
//     event.preventDefault();
//     logout().then(() => {
//       // Redirect after logout
//       location.assign('/');
//       window.location.href = '/';
//     });
//   });
// }

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    //console.log('in book tour event listener');
    //console.log(e.target);
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
