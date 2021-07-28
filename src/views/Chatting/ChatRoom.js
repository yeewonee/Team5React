import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonTable from "views/table/CommonTable";
import CommonTableColumn from "views/table/CommonTableColumn";
import style from "views/Chatting/chat.module.css";
import Paho from "paho-mqtt";
import { addChat, getChatting, getUserList, sendMqttMessage } from "apis/chat";
import { createSetUserId } from "redux/chatting-reducer";
import { Loading } from "Loading";

export const ChatRoom = (props) => {

  const dispatch = useDispatch();
  const reId = useSelector((state) => {
    return state.chattingReducer.userId;
  });

  //로딩 상태
  const [loading, setLoading] = useState(null);

  //직원 리스트 가져오기
  const [user, setUser] = useState([]);
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
  //직원 선택
  const handleUserName = async (event, reid) => {
    dispatch(createSetUserId(reid));
    setPubMessage((prev) => {
      return {
        ...prev,
        topic: "/chat/" + reid,
      };
    });
    setPubState(true);
    setSubTopic("/chat/" + props.uid);

    getChattingList(props.uid, reid);
  };

  //이전 채팅 리스트 가져오기
  const getChattingList = async (uid, reid) => {
    try {
      const promise = await getChatting(uid, reid);
      setChatList(promise.data);
    } catch (error) {
      console.log(error);
    }
  };

  //-------------------------------------------------------------
  //상태 선언
  //-------------------------------------------------------------
  const [connected, setConnected] = useState(false);
  const [subTopic, setSubTopic] = useState("/chat/" + props.uid);
  const [message, setMessage] = useState("");
  const [pubMessage, setPubMessage] = useState({
    topic: "/chat/#",
    content: "",
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

  //-------------------------------------------------------------
  //버튼 이벤트 처리
  //-------------------------------------------------------------
  let client = useRef(null);
  const connectMqttBroker = () => {
    //Paho.MQTT.Clinet에서 MQTT가 빠짐
    client.current = new Paho.Client("kosa3.iptime.org", 50015, "client-" + new Date().getTime());

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

  //메시지 수신시 리렌더링
  useEffect(() => {
    getChattingList(props.uid, reId);
  }, [message]);

  const disconnectMqttBroker = () => {
    client.current.disconnect();
  };

  const sendSubTopic = () => {
    client.current.subscribe(subTopic);
  };

  const addChating = async (chat) => {
    try {
      await addChat(chat);
    } catch (error) {
      console.log(error);
    }
  };

  //전송 및 데이터베이스 저장
  const publishTopic = async () => {
    let chat = {
      sender: props.uid,
      message: pubMessage.content,
      recipient: reId,
      messageDate: new Date(),
    };

    await addChating(chat);
    await getChattingList(props.uid, reId);
    await sendMqttMessage(pubMessage);

    setPubMessage({
      ...pubMessage,
      content: "",
    });
  };

  //-------------------------------------------------------------
  //마운트 및 언마운트에 실행할 내용
  //-------------------------------------------------------------
  useEffect(() => {
    connectMqttBroker();
    return () => {
      dispatch(createSetUserId(""));
      disconnectMqttBroker();
    };
  }, []);

  //스크롤 맨 밑
  const scrollRef = useRef(null);
  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "auto", block: "end", inline: "nearest" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  //Enter키 입력 시 전송
  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      publishTopic();
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between" style={{ marginTop: "10px", fontFamily: "DoHyeon-Regular" }}>
        <div style={{ border: "1px solid #e5dbff", width: "30%", height: "45vh" }}>
          {loading ? (
            <div>
              <div style={{ marginTop: "60%", marginLeft: "45%" }}>
                <Loading height={30} width={30} />
              </div>
              <p style={{ marginLeft: "41%" }}>Loading..</p>
            </div>
          ) : (
            <CommonTable headersName={["이름"]} tstyle={"table table-sm"}>
              {user.map((user, index) => (
                <tr
                  key={index}
                  onClick={(event) => {
                    handleUserName(event, user.userId);
                  }}
                  className={user.userId === reId ? style.select_Color : style.basic_Color}
                  style={{ cursor: "pointer" }}
                >
                  <CommonTableColumn>
                    {user.userName} ({user.authority})
                  </CommonTableColumn>
                </tr>
              ))}
            </CommonTable>
          )}
        </div>
        {pubState ? (
          <>
            <div className={style.slimscroll} style={{ border: "1px solid #e5dbff", backgroundColor: "#e5dbff", width: "70%", marginLeft: "10px", height: "45vh", borderRadius: "1em" }}>
                  <div ref={scrollRef}>
                    {chatList.length !== 0 ? (
                      <>
                        {chatList.map((chat, index) => (
                          <div key={index} style={{ width: "95%", marginTop: "5px", marginLeft: "2%", height: "5vh" }}>
                            {chat.sender !== props.uid ? (
                                <div className="d-flex flex-row bd-highlight">
                                  <p style={{ border: "1px solid black", padding: "5px", backgroundColor: "white", borderRadius: "1em" }}>{chat.message}</p>
                                  <p style={{ fontSize: "0.1em", paddingTop: "22px", marginLeft: "5px" }}>{chat.messageDate}</p>
                                </div>
                            ) : (
                                <div className="d-flex flex-row-reverse bd-highlight">
                                  <p style={{ border: "1px solid black", padding: "5px", backgroundColor: "white", borderRadius: "1em" }}>{chat.message}</p>
                                  <p style={{ fontSize: "0.1em", paddingTop: "22px", marginRight: "5px" }}>{chat.messageDate}</p>
                                </div>
                            )  
                            }
                          </div>
                        ))}
                      </>
                    ) : (
                        <div style={{ width: "95%", marginTop: "5px", marginLeft: "2%", height: "5vh" }}>
                          <div>
                            <p style={{ marginLeft: "38%", marginTop: "30%" }}>지난 대화가 없습니다.</p>
                          </div>
                        </div>
                    )}
                  </div>
            </div>
          </>
        ) : (
          <div style={{ border: "1px solid #e5dbff", backgroundColor: "#e5dbff", width: "70%", marginLeft: "10px", height: "45vh", overflow: "auto", borderRadius: "1em" }}>
            <p style={{ marginLeft: "38%", marginTop: "30%" }}>상대를 선택하세요.</p>
          </div>
        )}
      </div>

      {reId ? (
          <div style={{ width: "69%", marginLeft: "31%" }}>
            <div className="input-group mb-3 mt-2">
              <input type="text" className="form-control" name="content" value={pubMessage.content} onChange={changePubMessage} onKeyPress={onKeyPress} />
              <div className="input-group-append">
                {/* {loading2 ? (
                  <button className="btn btn-secondary" type="button">
                    wait..
                  </button>
                ) : ( */}
                  <button className="btn btn-secondary" type="button" onClick={publishTopic}>
                    전송
                  </button>
                {/* )} */}
              </div>
            </div>
          </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
