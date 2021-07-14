import style from './rlist.module.css';
import { Button, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form";
import { newPatient, sendMqttMessage } from "apis/reception";
import axios from "axios";
import FindAddrDom from '../PostCodeComponent/FindAddrDom';
import FindAddr from '../PostCodeComponent/FindAddr';

const NewRegistration = (props) => {
  const [setting, setSettting] = useState(false);
  const[patient, setPatient] = useState({
    pname: "",
    pssn1:"",
    pssn2:"",
    psex:"",
    page:"",
    pphone1:"",
    pphone2:"",
    pphone3:"",
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
  const [errorMessage, setErrorMessage] = useState("")
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

  const cancelFunc = (e) => {
    setPatient({
      pname: "",
      pssn1:"",
      pssn2:"",
      psex:"",
      page:"",
      pphone1:"",
      pphone2:"",
      pphone3:"",
      zonecode:"",
      address:"",
      detailaddress:""
    })
    setChecked1(false)
    setChecked2(false)
    props.handleClose()
  }

  //신규환자 등록
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async(values) => {
    if(patient.zonecode === "" || patient.detailaddress === ""){
      Swal.fire({
        icon: 'error',
        text: '주소를 입력해 주세요.',
        confirmButtonColor: '#3085d6'
      })
      return false;
    }else{
      const patientRegister = {
        patientName: patient.pname,
        patientSsn1: patient.pssn1,
        patientSsn2: patient.pssn2,
        patientSex: patient.psex,
        patientAge: patient.page,
        patientPhone: patient.pphone1+"-"+patient.pphone2+"-"+patient.pphone3,
        patientZip: patient.zonecode,
        address: patient.address,
        addressDetail: patient.detailaddress
      }

      await sendMqttMessage(props.pubMessage);
      await sendMqttMessage(props.pubMessage2);
      setPatient({
        pname: "",
        pssn1:"",
        pssn2:"",
        psex:"",
        page:"",
        pphone1:"",
        pphone2:"",
        pphone3:"",
        zonecode:"",
        address:"",
        detailaddress:""
      })
      setChecked1(false)
      setChecked2(false)
      props.handleClose()
      return await newPatient(patientRegister); 

    }
  }
  return(
    <Modal show={props.show} onHide={props.handleClose} className={style.font} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title style={{color:'gray', textShadow:'1px 1px 1px'}}>신규환자 등록</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <table calss="table">
            <tbody>
              <tr className={style.table}>
                <th className={style.tr1}>&nbsp;환자이름<input type="text" name="pname" maxLength="6" className={style.inputtext1} onChange={handleChange}
                    ref={
                      register({
                          maxLength: 6, 
                          required: true,
                          pattern:/^[가-힣]{2,6}$/
                      })
                    } 
                  />
                  <div className={style.errortext}>{errors.pname && "이름은 2~6자 한글로 입력해 주세요."}</div>
                </th>
                <th className={style.tr2}>&nbsp;주민번호 <input type="text" name="pssn1" maxLength="6" className={style.inputtext2} onChange={handleChange}
                  ref={
                    register({
                        minLength: 6, 
                        required: true, 
                        pattern: /^[0-9]*$/
                    })
                  }
                  />-<input type="password" name="pssn2"  maxLength="7" className={style.inputtext2} onChange={handleChange}
                    ref={
                      register({
                          minLength: 7, 
                          required: true, 
                          pattern: /^[0-9]*$/
                      })
                    }
                  />
                  <div className={style.errortext}>{errors.pssn1 && "주민등록번호 앞자리는 숫자 6자리 입니다."}</div>
                  <div className={style.errortext}>{errors.pssn2 && "주민등록번호 뒷자리는 숫자 7자리 입니다."}</div>
                </th>

              </tr>
              <tr>
                <th className={style.tr1}>&nbsp;성별&emsp;&emsp;&nbsp;
                  <input type="radio" value="Male" className="radio" name="psex" onChange={(e) => handleButtonChange1(e)} checked={checked1}
                  ref={
                    register({
                      required: true
                    })}
                  />
                    남&emsp;
                  <input type="radio" value="Female" className="radio" name="psex" onChange={(e) => handleButtonChange2(e)} checked={checked2}
                  ref={
                    register({
                      required: true
                    })}
                  />
                    여
                  <div className={style.errortext}>{errors.psex && "성별을 선택해주세요."}</div>                                    
                </th>

                <th className={style.tr1}>&nbsp;나이<input type="text" className={style.inputage} name="page" maxLength="3" onChange={handleChange}
                  ref={
                    register({
                        minLength: 1, 
                        required: true, 
                        pattern: /^[0-9]*$/
                    })
                  }
                />
                <div className={style.errortext}>{errors.page && "나이는 숫자 3자리 이내 입니다."}</div>                  
                </th>  
              </tr>
              <tr>
                <th colSpan="2" className={style.tr1}>&nbsp;전화번호
                <input type="text" className={style.inputphone1} name="pphone1" maxLength="3" onChange={handleChange}
                  ref={
                    register({
                        minLength: 3, 
                        required: true, 
                        pattern: /^[0-9]*$/
                    })
                  }
                />-
                <input type="text" className={style.inputphone2} name="pphone2" maxLength="4"onChange={handleChange}
                  ref={
                    register({
                        minLength: 4, 
                        required: true, 
                        pattern: /^[0-9]*$/
                    })
                  }
                />-
                <input type="text" className={style.inputphone2} name="pphone3" maxLength="4" onChange={handleChange}
                    ref={
                      register({
                          minLength: 4, 
                          required: true, 
                          pattern: /^[0-9]*$/
                      })
                    }
                />
                <div className={style.errortext}>{errors.pphone1 && "전화번호 앞자리는 숫자 3자리 입니다."}</div>                  
                <div className={style.errortext}>{errors.pphone2 && "전화번호 중간자리는 숫자 4자리 입니다."}</div>                  
                <div className={style.errortext}>{errors.pphone3 && "전화번호 뒷자리는 숫자 4자리 입니다."}</div>                  
                

                </th>
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
                <th colSpan="2" className={style.tr1}>&nbsp;주소<input type="text" className={style.inputaddress} value={patient.address} name="address" readOnly/>
              </th>
              </tr>
              <tr>
                <th colSpan="2" className={style.tr1}>&nbsp;상세주소<input type="text" className={style.inputtext3} name="detailaddress" onChange={handleChange}
                ref={
                  register({
                    minLength: 1,
                    required: true
                  })}/>
                <div className={style.errortext}>{errors.detailaddress && "주소를 입력해 주세요."}</div>                              
              
                </th>
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
          <Button disabled={false} style={{backgroundColor:'#4dabf7'}} type="submit">
            확인
          </Button>
          <Button style={{backgroundColor:'#f74d4d'}} onClick={(e) => cancelFunc(e)}>
            취소
          </Button>
        </Modal.Footer>
        </form>  
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