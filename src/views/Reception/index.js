import style from "./reception.module.css";
import RGraph from "./RGraphComponent";
import RDonut from './RDonutComponent';
import ReceptionList from "./ReceptionListComponent";
import { useEffect } from 'react';
import { useState, useRef } from "react";
import Paho from "paho-mqtt";
function Reception(props) { 
  // 예약취소
  const [cBoolean, setCBoolean] = useState(false);
  // 접수완료
  const [comBoolean, setComBoolean] = useState(false);

  const [connected, setConnected] = useState(false);
  const [subTopic, setSubTopic] = useState("/main/reception");
  const [pubMessage, setPubMessage] = useState({
    topic: "/main/diagnosis",
  });

  const [pub2ndMessage, set2ndPubMessage] = useState({
    topic: "/main/createReception",
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
      console.log("메시지 수신");
      var message = JSON.parse(msg.payloadString);
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
  return (
    <div className={style.back}>
      <div className={style.border1}>
        <RGraph/>
      </div>
      <div className={style.border2}>
        <RDonut
        setCBoolean={setCBoolean}
        setComBoolean={setComBoolean}
        cBoolean={cBoolean}
        comBoolean={comBoolean}
        />
      </div>
      <div className={style.border3}>
        <ReceptionList
        pubMessage={pubMessage}
        pub2ndMessage={pub2ndMessage}
        setCBoolean={setCBoolean}
        setComBoolean={setComBoolean}
        cBoolean={cBoolean}
        comBoolean={comBoolean}
        />
      </div>
    </div>
  );
}

export default Reception;