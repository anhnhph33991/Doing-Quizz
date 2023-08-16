export const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS" // định nghĩa tên action

export const doLogin = (response) => { 
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: response,
  };
};
