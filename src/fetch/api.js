import axios from 'axios';

// axios 配置
axios.defaults.timeout = 5000;

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params,
    }).then((response) => {
      resolve(response.data);
    }).catch((error) => {
      reject(error);
    });
  });
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      resolve(response.data);
    }).catch((error) => {
      reject(error);
    });
  });
}

export default {
  orders(params) {
    return get('/api/v1/orders', params);
  },
  compress(params) {
    return post('/api/v1/cards', params);
  },
};
