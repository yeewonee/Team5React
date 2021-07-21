import axios from "axios";

export function sendMqttMessage({topic, content}) {
    return axios.get("/sendMqttMessage", {params:{topic, content}});
  }

export function getUserList(uid){
    const promise = axios.get("/api/chat/userlist", {params:{uid}})
    return promise;
  }
  
  
  export function addChat(chat) {
    return axios.post("/api/chat/addchat", chat);
  }
  
  
  export function getChatting(uid, userId) {
    return axios.get("/api/chat/chatroom", {params:{uid, userId}});
  }
  