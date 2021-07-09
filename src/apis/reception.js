import axios from "axios";

export function sendMqttMessage({topic, content}) {
  return axios.get("/sendMqttMessage", {params:{topic, content}});
}