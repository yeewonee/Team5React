import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";


export function getMainNoticeList() {
  const promise = axios.get("/boards/main");
  return promise;
}