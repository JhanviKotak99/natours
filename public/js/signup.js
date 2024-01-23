/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

//console.log('login script loaded');

export const signUp = async (name, email, password, confirmPassword) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/signUp',
      data: {
        name,
        email,
        password,
        confirmPassword,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Sign up successfull');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
