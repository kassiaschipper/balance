import axios from "axios";

const BASE_URL = "http://localhost:5000";

function createHeaders() {
  const auth = JSON.parse(localStorage.getItem("token"));

  const config = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };

  return config;
}

function postSignIn(body) {
  const promise = axios.post(`${BASE_URL}/auth/sign-in`, body);
  return promise;
}

export { postSignIn }