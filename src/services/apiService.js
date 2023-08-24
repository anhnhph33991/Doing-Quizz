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
const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.put("api/v1/participant", data);
};

const deleteUser = (id) => {
  return axios.delete("api/v1/participant", { data: { id: id } });
};

const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (email, password) => {
  return axios.post(`api/v1/login`, {
    email,
    password,
    delay: 1000,
  }); //set delay khi req login
};

const postRegister = (username, email, password) => {
  return axios.post("api/v1/register", { username, email, password });
};

const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};

const getDataQuiz = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data) => {
  // console.log({...data})
  return axios.post("api/v1/quiz-submit", { ...data });
};

const postCreateNewQuiz = (description, name, difficulty, image) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);
  return axios.post("api/v1/quiz", data);
};

const getAllQuizForAdmin = () => {
  return axios.get("api/v1/quiz/all");
};

const putUpdateQuiz = (description, name, difficulty) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);

  return axios.put("api/v1/quiz", data);
};

const deleteQuiz = (id) => {
  return axios.delete(`api/v1/quiz/${id}`);
}

export {
  postCreatNewUser,
  getAllUser,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuizForAdmin,
  putUpdateQuiz,
  deleteQuiz
};
