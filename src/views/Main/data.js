import axios from "axios";


export function getMainNoticeList() {
  const promise = axios.get("/boards/main");
  return promise;
}