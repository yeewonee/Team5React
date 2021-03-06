import axios from "axios";

export function getReceptionList(day) {
  const promise = axios.get("/api/reception", {params:{day:day}});
  return promise;
}

export function cancelReceptionFunc(cancelId, day) {
  return axios.delete("/api/reception/cancelReception", {params:{cancelId:cancelId, day:day}});
}

export function changeReceptionFunc(changeId, day) {
  return axios.get("/api/reception/changeReception", {params:{changeId:changeId, day:day}})

}

export function getCountDay(day, day1, day2, day3, day4, day5) {
  const promise = axios.get("/api/reception/countDay", {params:{day:day, day1:day1, day2:day2, day3:day3, day4:day4, day5:day5}});
  return promise;
}

export function getCountReception(day) {
  const promise = axios.get("/api/reception/countReception", {params:{day:day}});
  return promise;
}

export function sendMqttMessage({topic, content}) {
  return axios.get("/sendMqttMessage", {params:{topic, content}});
}