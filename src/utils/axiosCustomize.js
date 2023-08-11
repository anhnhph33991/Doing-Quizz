import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081/",
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// alert message validate be
instance.interceptors.response.use(
  function (response) {
    return response && response.data ? response.data : response;
  },
  function (error) {
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error.response);
  }
);

export default instance;

// Customize axios chỉ cần 1 đường link call api ở tất cả - Dễ thay đổi api.
