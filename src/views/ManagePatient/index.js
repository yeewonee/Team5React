import { getPatientList } from "apis/managePatient";
import { useEffect, useRef, useState } from "react";
import PatientList from "views/ManagePatient/PatientList";
import UpdateForm from "./UpdateForm";

import Paho from "paho-mqtt";

function ManagePatient(props) {
    const [patientList, setPatientList] = useState([]);
    const [loading, setLoading] = useState(null);

    const getPatient = async() => {
      setLoading(true);
        try{
          const patientResult = await getPatientList();
          setPatientList(patientResult.data);
          setLoading(false);
        } catch(error){
          console.log(error);
        }
      };

    useEffect(() => {
        getPatient();
    },[]);

    //mqtt

    const [connected, setConnected] = useState(false);
    const [subTopic, setSubTopic] = useState("/main/managePatient");
    const [message, setMessage] = useState("/main/managePatient");
  
    const [pubMessage, setPubMessage] = useState({
      topic: "/main/createReception",
    });  
    const [pubMessage2, setPubMessage2] = useState({
      topic: "/main/managePatient",
    });

    let client = useRef(null);
    const connectMqttBroker = () => { 
      //Paho.MQTT.Clinet에서 MQTT가 빠짐
      client.current = new Paho.Client("localhost", 61614, "client-" + new Date().getTime());
  
      client.current.onConnectionLost = () => {
        console.log("접속 끊김");
        setConnected(false);
      };
  
      client.current.onMessageArrived = (msg) => {
        console.log("환자관리 메세지 수신");      
        var message = JSON.parse(msg.payloadString); 
        setMessage(message)
        getPatient();
      };
  
      client.current.connect({onSuccess:() => {
        console.log("접속 성공");
        setConnected(true);
        sendSubTopic();
      }});
    };
  
  
    const sendSubTopic = () => {
      client.current.subscribe(subTopic);
    }
  
    useEffect(() => {
      connectMqttBroker();
    }, []);
    
return(

<div style={{fontFamily: "DoHyeon-Regular"}}>
      <div style={{marginLeft:'10px', paddingTop: '5px', paddingBottom: '5px'}}>
        <span style={{fontSize:'20px', color:'#495057'}}>환자 관리</span>
      </div>
      <div style={{display: 'flex'}}>
        <div style={{flexBasis: '65%', marginLeft:'20px', marginRight:'7px'}}>
          <PatientList data={patientList} pubMessage={pubMessage} pubMessage2={pubMessage2} loading={loading}></PatientList>
        </div>

        <div style={{flexBasis:'35%', marginRight:'7px'}}>
          <UpdateForm data={patientList} message={message} pubMessage={pubMessage} pubMessage2={pubMessage2}></UpdateForm>
        </div>

      </div>
    </div>

);

}
export default ManagePatient;