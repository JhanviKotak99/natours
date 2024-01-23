/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

//console.log('login script loaded');

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      //url: 'http://127.0.0.1:3000/api/v1/users/login',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfuly');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    //console.log('in logout');
    const res = await axios({
      method: 'GET',
      //url: 'http://127.0.0.1:3000/api/v1/users/logout',
      url: '/api/v1/users/logout',
    });
    //console.log(res);
    if (res.data.status === 'success') {
      //console.log(res.status);
      //location.reload(true);
      //window.location.href = '/';
      location.assign('/');
    }
  } catch (err) {
    showAlert('error', 'Error logging out');
  }
};
