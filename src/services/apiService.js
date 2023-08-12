import axios from "../utils/axiosCustomize"; //import file customize thay vì axios mặc định

// post data
const postCreatNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.post("api/v1/participant", data); // đường link này sẽ tự nối chuỗi với localhost ở file customize
};

// get data
const getAllUser = () => {
  return axios.get("api/v1/participant/all");
};


// update data
const putUpdateUser = (id ,username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.put("api/v1/participant", data);
};

const deleteUser = (id) => {
  return axios.delete("api/v1/participant", {data: {id: id}}) 
}

export { postCreatNewUser, getAllUser, putUpdateUser, deleteUser };
