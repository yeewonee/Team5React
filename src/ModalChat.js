import Modal from "../src/views/Diagnosis/PastRecord/Modal";
import React, { useEffect, useRef, useState } from 'react'
import CommonTable from "views/table/CommonTable";
import CommonTableColumn from "views/table/CommonTableColumn";
import { getUserList, sendMqttMessage } from "apis/diagnosis";
import CommonTableRow from "views/table/CommonTableRow";
import { useSelector } from "react-redux";
import Paho from "paho-mqtt";


export const ModalChat = (props) => {

  const closeModal = () => {
    props.closeModal();
  };

  const uid = useSelector((state) => {
    return state.authReducer.uid;
  });

  const [user, setUser] = useState([]);
  const userList = async () => {
    try {
      const response = await getUserList(uid);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userList();
  }, []);

  const [pubState, setPubState] = useState();
  const handleUserName = (event, userId) => {
    console.log("들어옴" + userId)
    setPubMessage({
      ...pubMessage,
      topic: "/topic1/" + userId
    });

    setSubTopic2("/topic1/"+userId);

  }
  
  
   //-------------------------------------------------------------  
  //상태 선언
  //-------------------------------------------------------------
  const [connected, setConnected] = useState(false);
  const [subTopic, setSubTopic] = useState("/topic1/"+uid);
  const [subTopic2, setSubTopic2] = useState("/topic1/");
  const [prevSubTopic, setPrevSubTopic] = useState("/topic1/#");
  const [pubMessage, setPubMessage] = useState({
    topic: "/topic1/" + pubState,
    content: "Hello"
  });
  const [contents, setContents] = useState([]);

  //입력 양식 값이 변경될 때 상태 변경

  const changePubMessage = (event) => {
    setPubMessage({...pubMessage, [event.target.name]:event.target.value});
  };



  //-------------------------------------------------------------
  //버튼 이벤트 처리
  //-------------------------------------------------------------
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
      setContents((contents) => {
        return contents.concat(message.topic + ": " + message.content);
      });
    };

    client.current.connect({onSuccess:() => {
      console.log("접속 성공");
      setConnected(true);
      sendSubTopic();
    }});
  };

  const disconnectMqttBroker = () => {
    client.current.disconnect();
  };

  const sendSubTopic = () => {
    client.current.unsubscribe(prevSubTopic);
    client.current.subscribe(subTopic);
    client.current.subscribe(subTopic2);

    setPrevSubTopic(subTopic);
  }

  const publishTopic = async () => {
    console.log(subTopic)
    console.log(pubMessage.topic)
    await sendMqttMessage(pubMessage);
  } 

  //-------------------------------------------------------------
  //마운트 및 언마운트에 실행할 내용
  //-------------------------------------------------------------
  useEffect(() => {
    connectMqttBroker();
    return (() => {
      disconnectMqttBroker();
    });
  }, []);




  return (
    <>
      {/* 과거기록 상세보기 modal */}
      <Modal open={props.modalOpen} close={closeModal} header="채팅">
        <div>로그인 중인 아이디 : {uid}</div>
        <div className="d-flex justify-content-between" >
          <div style={{border:'1px solid black', width:'30%'}}>리스트</div>
          <div style={{border:'1px solid black', width:'70%', marginLeft:'10px'}}>채팅방</div>
        </div>

        <div className="d-flex justify-content-between" style={{marginTop:'10px'}}>
          <div style={{border:'1px solid black', width:'30%', height:'60vh'}}>
          <CommonTable headersName={["이름"]} tstyle={"table table-sm"}>
            {user.map((user, index) => (
              <CommonTableRow key={index}>
                <CommonTableColumn><button onClick={(event)=>{handleUserName(event, user.userId)}}>{user.userName}</button></CommonTableColumn>
              </CommonTableRow>
            ))}
          </CommonTable>
          </div>
          <div style={{border:'1px solid black', width:'70%', marginLeft:'10px', height:'60vh'}}>
            <div style={{border:'1px solid black', width:'95%', marginTop:'10px', marginLeft:'2%', height:'50vh'}}>
              {contents.map((content, index) => <div key={index}>{content}</div>)}
            </div>
            <div style={{border:'1px solid black', width:'95%', marginTop:'5px', marginLeft:'2%', height:'5vh'}}>
              <input type="text" name="content" value={pubMessage.content} onChange={changePubMessage}/>
            </div>
          </div>
          
        </div>
        
        <button className="btn btn-info btn-sm ml-2" onClick={publishTopic}>보내기</button>
        
      </Modal>
    </>
  )
}
