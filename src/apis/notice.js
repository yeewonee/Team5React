import axios from "axios";


export function getMainNoticeList() {
  const promise = axios.get("/api/boards/main");
  return promise;
}

export function getNoticeList() {
  const promise = axios.get("/api/boards");
  return promise;
}