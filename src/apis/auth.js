import axios from "axios";


export function login(user) {
    const promise = axios.post("/auth/login", user); //공통경로 생략했음. post는 두번째 매개값으로 data
    return promise; //promise리턴
  }
  