import { getUserList, sendMqttMessage } from 'apis/diagnosis';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import CommonTable from 'views/table/CommonTable'
import CommonTableColumn from 'views/table/CommonTableColumn'
import style from "./chat.module.css";
import Paho from "paho-mqtt";

export const ChatRoom = (props) => {

      const [user, setUser] = useState([]);
      const userList = async () => {
        try {
          const response = await getUserList(props.uid);
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        userList();
      }, []);
    
      const [pubState, setPubState] = useState(false);
      const handleUserName = (event, userId) => {
        setColorSelect(userId)
        console.log("들어옴" + userId)
        setPubMessage((prev) => {
          return {
            ...prev,
            topic:  "/topic1/" + userId
          }
        });
        setPubState(true);
        setSubTopic("/topic1/" + props.uid)
      }
      
      
       //-------------------------------------------------------------  
      //상태 선언
      //-------------------------------------------------------------
      const [connected, setConnected] = useState(false);
      const [subTopic, setSubTopic] = useState("/topic1/" + props.uid);
      const [prevSubTopic, setPrevSubTopic] = useState("/topic1/#");
      const [pubMessage, setPubMessage] = useState({
        topic: "/topic1/#",
        content: "Hello"
      });
    
      const [contents, setContents] = useState([]);
      const [sendContents, setSendContents] = useState([]);
    
      //입력 양식 값이 변경될 때 상태 변경
    
      const changePubMessage = (event) => {
    
        setPubMessage((prev)=>{
          return{
            ...prev,
            [event.target.name]:event.target.value
          }
        });
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
          let today = new Date();   
          let hours = today.getHours(); // 시
          let minutes = today.getMinutes();  // 분
          console.log("메시지 수신");
          var message = JSON.parse(msg.payloadString);
          setContents((contents) => {
            return contents.concat(message.content);
          });
    
          setSendContents((contents) => {
            return contents.concat("시간" + hours + ':' + minutes);
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
    
        setPrevSubTopic(subTopic);
    
      }
    
      const publishTopic = async () => {
        let today = new Date();   
        let hours = today.getHours(); // 시
        let minutes = today.getMinutes();  // 분
    
        setSendContents((contents) => {
          return contents.concat(pubMessage.content);
        });
    
        setContents((contents) => {
          return contents.concat("시간" + hours + ':' + minutes);
        });
    
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
    
    const check = (content) => {
      let temp = content.charAt(0);
      if(temp === '시'){
        return true;
      }else{
        return false;
      }
    
    }
    
    const [colorSelect, setColorSelect] = useState("");
    return (
        <div>        
        <div className="d-flex justify-content-between" style={{marginTop:'10px'}}>
          <div style={{border:'1px solid black', width:'30%', height:'45vh'}}>
          <CommonTable headersName={["이름"]} tstyle={"table table-sm"}>
            {user.map((user, index) => (
              <tr key={index} onClick={(event)=>{handleUserName(event, user.userId)}} className={user.userId === colorSelect ? style.select_Color : style.basic_Color} style={{cursor:"pointer"}}>
                <CommonTableColumn>{user.userName}</CommonTableColumn>
              </tr>
            ))}
          </CommonTable>
          </div>
          
          {pubState ? 
            <div style={{border:'1px solid black', width:'70%', marginLeft:'10px', height:'45vh', overflow:'auto'}}>
            <div className="d-flex justify-content-between" style={{marginTop:'10px'}}>
              <div style={{width:'95%', marginTop:'5px', marginLeft:'2%', height:'50vh'}}>
                {contents.map((content, index) => 
                  <div key={index} className={ check(content) ? style.basic_Color : style.select_Color} style={{height:'30px'}}>
                    <p className={ check(content) ? style.select_Size : style.basic_Size}>{content}</p>
                  </div>
                )}
              </div>
              <div style={{width:'95%', marginTop:'5px', marginLeft:'2%', height:'50vh'}}>
                {sendContents.map((content, index) => 
                  <div key={index}  className={ check(content) ? style.basic_Color : style.select_Color} style={{height:'30px'}}>
                    <p className={ check(content) ? style.select_Size : style.basic_Size} >{content}</p>
                  </div>
                )}
              </div>
            </div>
            </div>
          :
          <div style={{border:'1px solid red', width:'70%', marginLeft:'10px', height:'45vh', overflow:'auto'}}>
            <p style={{marginLeft:'38%', marginTop:'30%'}}>상대를 선택하세요.</p>
          </div>
          }
        </div>
        
        <div style={{width:'69%', marginLeft:'31%'}}>
          <div class="input-group mb-3">
            <input type="text" class="form-control" name="content" value={pubMessage.content} onChange={changePubMessage} />
            <div class="input-group-append">
              <button class="btn btn-secondary" type="button" onClick={publishTopic}>전송</button>
            </div>
          </div>
        </div>
        </div>
    )
}
