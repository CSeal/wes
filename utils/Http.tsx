import axios from 'axios';

axios.defaults.baseURL = process.env.URL_API;
axios.defaults.headers.common.Accept = 'application/json';
// axios.defaults.headers.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // return Promise.reject(error);
      return error.response;
  });

export default axios;
