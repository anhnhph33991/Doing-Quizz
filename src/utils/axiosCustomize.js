import axios from "axios";
import NProgress from "nprogress"; // import loading

// config NProgress

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

const instance = axios.create({
  baseURL: "http://localhost:8081/",
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

instance.interceptors.request.use(
  function (config) {
    NProgress.start(); // khi gửi req lên thì sẽ start
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// alert message validate be
instance.interceptors.response.use(
  function (response) {
    NProgress.done(); // khi nhận res thì sẽ done
    return response && response.data ? response.data : response;
  },
  function (error) {
    NProgress.done();
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error.response);
  }
);

export default instance;

// Customize axios chỉ cần 1 đường link call api ở tất cả - Dễ thay đổi api.
