import React from 'react';
import { useState } from 'react';
import DaumPostcode from "react-daum-postcode";

const FindAddr = (props) => {
  const [zoneCode, setZoneCode] = useState("");
  const [address, setAddress] = useState("");
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(fullAddress)
        console.log(data.zonecode)
        props.onClose()
    }
 
    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: "-5%",
        left: "-10%",
        width: "600px",
        height: "450px",
        padding: "7px",
      };
 
    return(
        <div>
            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
            <button type='button' onClick={() => {props.onClose()}} className="btn btn-secondary">닫기</button>
        </div>
    )
}
 
export default FindAddr;