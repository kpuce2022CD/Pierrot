// Axios를 통해서 스프링부트와 연결

import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080";

class ApiService {
  fetchUsers() {
    return axios.get(USER_API_BASE_URL);
  }

  fetchUserByID(userID) {
    return axios.get(USER_API_BASE_URL + "/" + userID);
  }
}
