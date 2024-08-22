import axios from './axios'

export const postRegister = (username,email,password) => {
  return axios.post('/register',{
    username,
    email,
    password
  });
};

export const postLogin = (username, password) => {
  return axios.post('/login',{
    username,
    password
  })
}

export const linkMyStar = (listId, username) => {
  return axios.patch(`/users?username=${username}`, {
    listId
  })
}