import axios from "axios";
import NProgress from "nprogress"; // import loading
import { store } from "../redux/store"

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
    const access_token = store?.getState()?.user?.account?.access_token; // -?- nếu k có giá trị thì sẽ ra undefined nếu k use ? sẽ gây lỗi

    config.headers["Authorization"] = `Bearer ${access_token}`;

    NProgress.start(); // khi gửi req lên thì sẽ start
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// alert message validate BE
instance.interceptors.response.use(
  function (response) {
    NProgress.done(); // khi nhận res thì sẽ done
    return response && response.data ? response.data : response;
  },
  function (error) {
    NProgress.done();

    // Token expired
    if(error.response.data && error.response.data.EC === -1){
      window.location.href = '/login'; 
    }
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error.response);
  }
);

export default instance;

// Customize axios chỉ cần 1 đường link call api ở tất cả - Dễ thay đổi api.
