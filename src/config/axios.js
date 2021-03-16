import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://acme-todo-list.herokuapp.com"
});

export default axiosInstance;