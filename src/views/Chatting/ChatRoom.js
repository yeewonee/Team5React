import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonTable from "views/table/CommonTable";
import CommonTableColumn from "views/table/CommonTableColumn";
import style from "views/Chatting/chat.module.css";
import Paho from "paho-mqtt";
import { addChat, getChatting, getUserList, sendMqttMessage } from "apis/chat";
import { createSetUserId } from "redux/chatting-reducer";
import { Loading } from "Loading";

export const ChatRoom = (props) => {
  console.log("채팅 룸 실행")

  const [loading, setLoading] = useState(null);
  const [loading2, setLoading2] = useState(null);

  const [user, setUser] = useState([]);
  const [message, setMessage] = useState("");
  const userList = async () => {
    setLoading(true);
    try {
      const response = await getUserList(props.uid);
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userList();
  }, []);

 
  const [pubState, setPubState] = useState(false);
  const [chatList, setChatList] = useState([]);

  const dispatch = useDispatch();

  const [reId, setReId] = useState();
  const handleUserName = async (event, reid) => {
    dispatch(createSetUserId(reid));

    setPubMessage((prev) => {
      return {
        ...prev,
        topic: "/topic1/" + reid,
      };
    });
    setPubState(true);
    setSubTopic("/topic1/" + props.uid);

    getChattingList(props.uid, reid);

  };

  const getChattingList = async(uid, userId) => {
    setLoading2(true)
    try {
      const promise = await getChatting(uid, userId);
      setChatList(promise.data);
      setLoading2(false)
    } catch (error) {
      console.log(error);
    }
  };
  
  //-------------------------------------------------------------
  //상태 선언
  //-------------------------------------------------------------
  const [connected, setConnected] = useState(false);
  const [subTopic, setSubTopic] = useState("/topic1/" + props.uid);
  const [prevSubTopic, setPrevSubTopic] = useState("/topic1/#");
  const [pubMessage, setPubMessage] = useState({
    topic: "/topic1/#",
    content: ""
  });

  //입력 양식 값이 변경될 때 상태 변경

  const changePubMessage = (event) => {
    setPubMessage((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  useEffect(()=>{

  }, [])

  //-------------------------------------------------------------
  //버튼 이벤트 처리
  //-------------------------------------------------------------
  let client = useRef(null);
  const [contents, setContents] = useState();
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
      setMessage(message);
    };

    client.current.connect({
      onSuccess: () => {
        console.log("접속 성공");
        setConnected(true);
        sendSubTopic();
      },
    });
  };

  useEffect(()=>{
    getChattingList(props.uid, props.userId);
  }, [message])

  const disconnectMqttBroker = () => {
    client.current.disconnect();
  };

  const sendSubTopic = () => {
    client.current.unsubscribe(prevSubTopic);
    client.current.subscribe(subTopic);

    setPrevSubTopic(subTopic);
  };

  const publishTopic = async () => {
  
    let chat = {
      sender: props.uid,
      message: pubMessage.content,
      recipient: props.userId,
      messageDate: new Date()
    };

    console.log("sender", chat.sender)
    console.log("message", chat.message)
    console.log("받는사람", chat.recipient)
    console.log("시간", chat.messageDate)
    
    await addChating(chat)
    await getChattingList(props.uid, props.userId);
    await sendMqttMessage(pubMessage);

    setPubMessage({
      ...pubMessage,
      content: ""
    })

  };

  const addChating = async(chat) => {
    try {
        await addChat(chat);
    } catch (error) {
      console.log(error);
    }
  };

  
  //-------------------------------------------------------------
  //마운트 및 언마운트에 실행할 내용
  //-------------------------------------------------------------
  useEffect(() => {
    connectMqttBroker();
    return () => {
      dispatch(createSetUserId(""))
      disconnectMqttBroker();
    };
  }, []);

  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'auto', block: 'end', inline: 'nearest' });
  };

  useEffect(()=>{
    scrollToBottom();
  }, [loading2])
  
  
  // const onKeyPress = (event) => {
  //   if(event.key === 'Enter'){
  //     publishTopic();
  //   }
  // }
  return (
    <div>
      <div className="d-flex justify-content-between" style={{ marginTop: "10px", fontFamily: "DoHyeon-Regular"  }}>
        <div style={{ border: "1px solid #e5dbff", width: "30%", height: "45vh" }}>
          {loading ? 
          <>
            <div style={{marginTop:'60%', marginLeft:'45%'}}> 
              <Loading height={30} width={30}/>
            </div> 
            <p style={{marginLeft:'41%'}}>Loading..</p>
          </>
          :
          <CommonTable headersName={["이름"]} tstyle={"table table-sm"}>
            {user.map((user, index) => (
              <tr
                key={index}
                onClick={(event) => {
                  handleUserName(event, user.userId);
                }}
                className={user.userId === props.userId ? style.select_Color : style.basic_Color}
                style={{ cursor: "pointer" }}
              >
                <CommonTableColumn>{user.userName}({user.authority})</CommonTableColumn>
              </tr>
            ))}
            </CommonTable>
          }
          
        </div>

        {pubState ? (
          <>
          <div className={style.slimscroll} style={{ border: "1px solid #e5dbff", backgroundColor:'#e5dbff', width: "70%", marginLeft: "10px", height: "45vh", borderRadius: '1em' }}>
            {loading2 ? 
              <>
              <div style={{marginTop:'25%', marginLeft:'47%'}}> 
                <Loading height={30} width={30}/>
              </div> 
              <p style={{marginLeft:'45%'}}>Loading..</p>
              </>
            :
              <>
              <div ref={scrollRef}>
              {chatList.length !== 0 ? 
                <>
                 {chatList.map((chat, index) => (
                  <>
                  {chat.sender !== props.uid ? 
                  <div style={{ width: "95%", marginTop: "5px", marginLeft: "2%", height: "5vh" }}>
                   <div key={chat.chatId} className="d-flex flex-row bd-highlight">
                     <p style={{border:'1px solid black', padding:'5px', backgroundColor:'white', borderRadius: '1em'}}>{chat.message}</p>
                     <p style={{fontSize:'0.1em', paddingTop:'22px', marginLeft:'5px'}}>{chat.messageDate}</p>
                   </div>
                 </div>
                 :
                 <div style={{ width: "95%", marginTop: "5px", marginLeft: "2%", height: "5vh" }}>                
                  <div key={chat.chatId} className="d-flex flex-row-reverse bd-highlight">
                    <p style={{border:'1px solid black', padding:'5px', backgroundColor:'white', borderRadius: '1em'}}>{chat.message}</p>
                    <p style={{fontSize:'0.1em', paddingTop:'22px',  marginRight:'5px'}}>{chat.messageDate}</p>
                  </div>
                </div>
                  }
                  </>
                ))}
                </>
              :
                <>
                <div style={{ width: "95%", marginTop: "5px", marginLeft: "2%", height: "5vh" }}>
                   <div>
                     <p style={{marginLeft:'38%', marginTop:'30%'}}>지난 채팅이 없습니다.</p>
                   </div>
                 </div>
                </>
              }
               
            </div>
              </>
            }
           
          </div>
          </>
        ) : (
          <div style={{border: "1px solid #e5dbff", backgroundColor:'#e5dbff', width: "70%", marginLeft: "10px", height: "45vh", overflow: "auto", borderRadius: '1em' }}>
            <p style={{ marginLeft: "38%", marginTop: "30%" }}>상대를 선택하세요.</p>
          </div>
        )}
      </div>

      <div style={{ width: "69%", marginLeft: "31%" }}>
        <div className="input-group mb-3">
          <input type="text" className="form-control" name="content" value={pubMessage.content} onChange={changePubMessage} />
          <div className="input-group-append">
            {loading2 ? 
              <button className="btn btn-secondary" type="button">
               wait..
              </button>
            :
              <button className="btn btn-secondary" type="button" onClick={publishTopic}>
              전송
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
