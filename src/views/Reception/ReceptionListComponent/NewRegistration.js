import style from './rlist.module.css';
import { Button, Modal } from 'react-bootstrap';
import FindAddrDom from './PostCodeComponent/FindAddrDom';
import FindAddr from './PostCodeComponent/FindAddr';
import { useEffect, useState } from 'react';
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";

const NewRegistration = (props) => {
  const[patient, setPatient] = useState({
    pname: "",
    pssn1:0,
    pssn2:0,
    psex:"",
    page:0,
    pphone:0,
    zonecode:"",
    address:"",
    detailaddress:""
  })

  const handleChange = (event) => { //사용자 입력시 상태 변경을 위해
    setPatient({
      ...patient,
      [event.target.name]: event.target.value
    })
  }

  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(false)  
  const handleButtonChange1 = (e) => {
    setChecked1(true)
    setChecked2(false)
    setPatient({
      ...patient,
      psex: e.target.value
    })
  }
  const handleButtonChange2 = (e) => {
    setChecked1(false)
    setChecked2(true)
    setPatient({
      ...patient,
      psex: e.target.value
    })
  }

  //신규환자 등록
  const [registration, setRegistration] = useState([]);
  const registerFunction = async() => {
    console.log("회원가입")
    const patientRegister = {
      patientName: patient.pname,
      patientSsn1: patient.pssn1,
      patientSsn2: patient.pssn2,
      patientSex: patient.psex,
      patientAge: patient.page,
      patientPhone: patient.pphone,
      patientZip: patient.zonecode,
      Address: patient.address,
      AddressDetail: patient.detailaddress
    }
    const test = [0,1,2]

    return await axios.post("/reception/registration", patientRegister); 
  }

  console.log(patient)
  return(
    <Modal show={props.show} onHide={props.handleClose} className={style.font} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title style={{color:'gray', textShadow:'1px 1px 1px'}}>신규환자 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table calss="table">
            <tbody>
              <tr className={style.table}>
                <th className={style.tr1}>&nbsp;환자이름<input type="text" name="pname" className={style.inputtext1} onChange={handleChange}/></th>
                <th className={style.tr2}>&nbsp;주민번호 <input type="text" name="pssn1" className={style.inputtext2} onChange={handleChange}/>&nbsp;&nbsp;-<input type="password" name="pssn2" className={style.inputtext2} onChange={handleChange}/></th>
              </tr>
              <tr>
                <th className={style.tr1}>&nbsp;성별&emsp;&emsp;&nbsp;
                  <input type="radio" value="남" className="radio" name="psex" onChange={(e) => handleButtonChange1(e)} checked={checked1}/>
                    남&emsp;
                  <input type="radio" value="여" className="radio" name="psex" onChange={(e) => handleButtonChange2(e)} checked={checked2}/>
                    여
                </th>

                <th className={style.tr1}>&nbsp;나이<input type="text" className={style.inputage} name="page" onChange={handleChange}/></th>  
              </tr>
              <tr>
                <th colSpan="2" className={style.tr1}>&nbsp;전화번호<input type="text" className={style.inputtext3} name="pphone" onChange={handleChange}/></th>
              </tr>
              <tr>
                <th className={style.tr1}>&nbsp;우편번호<input type="text" className={style.inputtext1} value={patient.zonecode} name="zonecode" readOnly/></th>
                <th className={style.tr1}>   
                  <div>
                    &nbsp;<button className="btn btn-sm btn-light" onClick={props.openPostCode}>우편번호 검색</button>

                  </div>   
                </th>             
              </tr>
              <tr>
                <th colSpan="2" className={style.tr1}>&nbsp;주소<input type="text" className={style.inputaddress} value={patient.address} name="address" readOnly/></th>
              </tr>
              <tr>
                <th colSpan="2" className={style.tr1}>&nbsp;상세주소<input type="text" className={style.inputtext3} name="detailaddress" onChange={handleChange}/></th>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <div id='FindAddrDom'>
            {props.isPopupOpen && (
                <FindAddrDom>
                    <FindAddr setPatient={setPatient} patient={patient} onClose={props.closePostCode} />
                </FindAddrDom>
            )}
          </div>
          <Button style={{backgroundColor:'#4dabf7'}} onClick={registerFunction}>
            확인
          </Button>
          <Button style={{backgroundColor:'#f74d4d'}} onClick={props.handleClose}>
            취소
          </Button>
        </Modal.Footer>
        <style jsx="true" global="true">{`
            .custom-modal {
              font-family: "DoHyeon-Regular"; 
            }
          `}
        </style>
      </Modal>
  )
}

export default NewRegistration;