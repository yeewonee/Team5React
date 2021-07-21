import axios from "axios";


export function getMainNoticeList() {
  const promise = axios.get("/boards/main");
  return promise;
}

export function getNoticeList() {
  const promise = axios.get("/boards");
  return promise;
}