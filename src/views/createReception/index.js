import PatientList from "./PatientList";
import DoctorList from "./DoctorList";
import CheckCalendar from "./CheckCalendar";
import CheckTime from "./CheckTime";
import AddReception from "./AddReception";
import { useEffect, useState, useRef } from "react";
import { getDoctorList, getPatientList, getReceptionListByDate } from "apis/createReception";
import Paho from "paho-mqtt";
import { useSelector } from "react-redux";

function CreateReception(props) {
  const [patientList, setPatientList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [todayReceptionList, setTodayReceptionList] = useState([]);
  const [loadingPatient, setLoadingPatient] = useState(null);
  const [loadingDoctor, setLoadingDoctor] = useState(null);

  const r_date = useSelector((state) => {
    return state.createReceptionReducer.date
  });

  const getPatient = async() => {
    setLoadingPatient(true);
    try{
      const patientResult = await getPatientList();
      setPatientList(patientResult.data);
      setLoadingPatient(false);
    } catch(error){
      console.log(error);
    }
  };
  
  const getDoctor = async() => {
    setLoadingDoctor(true);
    try{
      const doctorResult = await getDoctorList();
      setDoctorList(doctorResult.data);
      setLoadingDoctor(false);
    } catch(error){
      console.log(error);
    }
  };

  const getTodayList = async() => {
    try{
      const result = await getReceptionListByDate(r_date);
      console.log(r_date);
      console.log(result.data);
      setTodayReceptionList(result.data);
    } catch(error){
      console.log(error);
    }
  };


  useEffect(() => {
    getPatient();
    getDoctor();
  },[])

  useEffect(() => {
    getTodayList();
  },[r_date]);

//mqtt
  const [connected, setConnected] = useState(false);
  const [subTopic, setSubTopic] = useState("/main/createReception");
  const [message, setMessage] = useState("/main/createReception");

  // const [contents, setContents] = useState([]);

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
        <span style={{fontSize:'20px', color:'#495057'}}>예약 등록</span>
      </div>
      <div style={{display: 'flex'}}>
        <div style={{flexBasis: '40%', marginLeft:'20px', marginRight:'7px'}}>
          <PatientList data={patientList} loading={loadingPatient}/>
          <DoctorList data={doctorList} loading={loadingDoctor}/>
        </div>

        <div style={{flexBasis:'25%', marginRight:'7px'}}>
          <CheckCalendar/>
          <CheckTime/>
        </div>

        <div style={{flexBasis:'32%'}}>
          <AddReception pdata={patientList} ddata={doctorList} rdate={todayReceptionList}/>
        </div>

      </div>
    </div>
  );
}

export default CreateReception;