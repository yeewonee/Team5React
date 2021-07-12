import React, { useEffect, useRef, useState } from "react";
import DetailTable from "./DetailTable/DetailTable";
import "./index.css";
import InspectState from "./InspectState/InspectState";
import PatientTable from "./PatientTable/PatientTable";
import Progress from "./Progress/Progress";
import { useSelector } from "react-redux";
import Paho from "paho-mqtt";
import { getInspecetList, getPatientList } from "apis/inspection";



function Inspection(props) {
  //선택한 환자 pno
  const state = useSelector((state) => state.inspectReducer.patient);
  console.log("리렌더링");
  const pno = state.pno;
  const [patientList, setPatientList] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);
  const [inspectLists, setInspectLists] = useState([]);
  const [connected, setConnected] = useState(false);
  const [subTopic, setSubTopic] = useState("/main/inspection");

  const [loading, setLoading] = useState(null);

  const changeLoading = (result) => {
    setLoading(result);
  };

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
      getPatientsList();
    };

    client.current.connect({
      onSuccess: () => {
        console.log("접속 성공");
        setConnected(true);
        sendSubTopic();
      },
    });
  };

  const disconnectMqttBroker = () => {
    client.current.disconnect();
  };

  const sendSubTopic = () => {
    client.current.subscribe(subTopic);
  };

  useEffect(() => {
    connectMqttBroker();
    return () => {
      disconnectMqttBroker();
    };
  }, []);

  const getPatientsList = async () => {
    changeLoading(true);
    const result = await getPatientList();
    setPatientList(result.data);
    setCategoryArray(result.data);
    changeLoading(false);
  };

  const getInspectsList = async (pno, did) => {
    const result = await getInspecetList(pno,did);
    setInspectLists(result.data);
  };

  useEffect(() => {
    getPatientsList();
  }, []);

  useEffect(() => {
    getInspectsList(pno, state.did);
  }, [state.pno, pno]);
  // const patientList = getPatientList();
  //선택한 환자의 검사리스트를 가져옴
  // const inspectList = getInspectList(state?.pno);

  const getUser = (pno) => {
    const user = patientList.find((idata) => idata.patientId === pno);
    return user;
  };

  let user;
  //state값 비어있을 경우 patientList의 가장 첫번째 환자정보를 보냄
  if (!state) {
    user = getUser(patientList[0].patientId);
  } else {
    user = getUser(state.pno);
  }

  let arr = [];
  const changeCategory = (value) => {
    if (value === "전체") {
      setCategoryArray(patientList);
    }
    if (value === "대기") {
      arr = patientList.filter((list) => list.totalIstatus === value);
      setCategoryArray(arr);
    }
    if (value === "진행중") {
      arr = patientList.filter((list) => list.totalIstatus === value);
      console.log(arr);
      setCategoryArray(arr);
    }
    if (value === "완료") {
      arr = patientList.filter((list) => list.totalIstatus === value);
      setCategoryArray(arr);
    }
  };

  const changeKeyword = (arr1) => {
    setCategoryArray(arr1);
  };

  return (
    <div className="middle">
      <div className="middle-left">
        <InspectState data={patientList} />
        <PatientTable data={patientList} categoryArray={categoryArray} fun={changeCategory} keywordArr={changeKeyword} loading={loading}/>
      </div>
      <div className="middle-right">
        <Progress data={user} list={inspectLists} />
        <DetailTable data={inspectLists} loading={loading}/>
      </div>
    </div>
  );
}

export default Inspection;
