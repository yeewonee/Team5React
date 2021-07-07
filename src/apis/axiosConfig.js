import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080"; //공통경로 설정

export function addAuthHeader(authToken) { //로그인 되었을 때 authToekn이 기본적으로 추가해서 보내도록!
  axios.defaults.headers.common["authToken"] = authToken;
}

export function removeAuthHeader() { //로그아웃 하면 더 이상 authToken을 보내면 안되니까 빼버림
  delete axios.defaults.headers.common["authToken"];
}