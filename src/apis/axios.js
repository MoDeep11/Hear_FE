import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://43.201.251.191:8080/swagger-ui/index.html', 
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;