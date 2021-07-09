import PatientList from "./PatientList";
import DoctorList from "./DoctorList";
import CheckCalendar from "./CheckCalendar";
import CheckTime from "./CheckTime";
import AddReception from "./AddReception";
import { useEffect, useState, useRef } from "react";
import { getDoctorList, getPatientList } from "apis/createReception";
import Paho from "paho-mqtt";

function CreateReception(props) {
  const [patientList, setPatientList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);

  const getList = async() => {
    try{
      const patientResult = await getPatientList();
      const doctorResult = await getDoctorList();
      setPatientList(patientResult.data);
      setDoctorList(doctorResult.data);
    } catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  },[])

//mqtt
  const [connected, setConnected] = useState(false);
  const [subTopic, setSubTopic] = useState("/topic1/#");
  const [pubMessage, setPubMessage] = useState({
    topic: "/topic1/topic2",
    content: "Hello"
  });
  const [contents, setContents] = useState([]);

  let client = useRef(null);
  const connectMqttBroker = () => {
    //Paho.MQTT.Clinet에서 MQTT가 빠짐
    client.current = new Paho.Client("localhost", 61614, "client-" + new Date().getTime());

    client.current.onConnectionLost = () => {
      console.log("접속 끊김");
      setConnected(false);
    };

    client.current.onMessageArrived = (msg) => {
      console.log("메시지 수신");
      
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
        <span style={{fontSize:'20px', color:'#495057'}}>예약 등록</span>
      </div>
      <div style={{display: 'flex'}}>
        <div style={{flexBasis: '40%', marginLeft:'20px', marginRight:'7px'}}>
          <PatientList data={patientList}/>
          <DoctorList data={doctorList}/>
        </div>

        <div style={{flexBasis:'25%', marginRight:'7px'}}>
          <CheckCalendar/>
          <CheckTime/>
        </div>

        <div style={{flexBasis:'32%'}}>
          <AddReception pdata={patientList} ddata={doctorList} pubMessage={pubMessage}/>
        </div>

      </div>
    </div>
  );
}

export default CreateReception;