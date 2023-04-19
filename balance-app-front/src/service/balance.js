import axios from "axios";

const BASE_URL = "http://localhost:4000";

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
  const promise = axios.post(`${BASE_URL}/sign-in`, body);
  return promise;
}

function postFile(body){
  const config = createHeaders();
  const promise = axios.post(`${BASE_URL}/home`, body, config);
  return promise;
}

function getTotal(){
  const config = createHeaders();
  const promise = axios.get(`${BASE_URL}/home`,config);
  return promise;
}
function changePassword(body){
  const promise = axios.put(`${BASE_URL}/user`, body);
  return promise;
}
export { postSignIn, postFile, getTotal, changePassword }