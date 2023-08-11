import axios from "../utils/axiosCustomize"; //import file customize thay vì axios mặc định

const postCreatNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.post("api/v1/participant", data); // đường link này sẽ tự nối chuỗi với localhost ở file customize
};

const getAllUser = () => {
  return axios.get("api/v1/participant/all");
};

export { postCreatNewUser, getAllUser };
