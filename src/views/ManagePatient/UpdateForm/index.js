import { useSelector } from "react-redux";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import FindDom from "./FindDom";
import PopupPostCode from "./PopupPostCode";
import { updatePatient } from "apis/managePatient";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2' 

function UpdateForm(props) {
    const history = useHistory();
    const patientList = props.data;
    const pid = useSelector((state) => {
        return state.managePatientReducer.patient_id
    });

    let clickPatient = patientList.filter((list)=>list.patientId === pid);
    const realpatient = clickPatient[0]
    console.log(realpatient)

    const [patient, setPatient] = useState({
        address: "",
        addressDetail: "",
        patientId: "",
        patientName: "",
        patientPhone: "",
        patientSsn1: "",
        patientSsn2: "",
        patientZip: ""
    });

    useEffect(() => {
        const work = async() => {
            try{
                setPatient({
                    address: realpatient.address,
                    addressDetail: realpatient.addressDetail,
                    patientId: realpatient.patientId,
                    patientName: realpatient.patientName,
                    patientPhone: realpatient.patientPhone,
                    patientSsn1: realpatient.patientSsn1,
                    patientZip: realpatient.patientZip
                });
            } catch(error){
                console.log(error);
            }
        }
        work();
    },[realpatient]);

    const handleUpdate = async(event) => {
        const dirtyPatient = {...patient};
        await updatePatient(dirtyPatient);

        Swal.fire({
          icon: 'success',
          text: '수정이 완료 됐습니다.',
          confirmButtonColor: '#3085d6'
        })
    };

    const handleBack = () => {
      history.goBack();
    };

  // 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false)
 
	// 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }
 
	// 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }

    const handleChange = (event) => {
        setPatient({
          ...patient,
          [event.target.name]: event.target.value
        })
      }

return (
    <>
    <div className={style.box}>
    <form style={{margin:'10px'}}>
    <div className="form-group">
      <div>환자번호</div>
      <input type="text" className="form-control" name="patientId" value={patient.patientId||''} readOnly></input>
    </div>
    <div className="form-group">
      <div>이름</div>
      <input type="text" className="form-control" name="patientName" value={patient.patientName||''} readOnly></input>
    </div>
    <div className="form-group">
      <div>생년월일</div>
      <input type="text" className="form-control" name="patientSsn1" value={patient.patientSsn1||''} readOnly></input>
    </div>
    <div className="form-group">
      <div>전화번호</div>
      <input type="text" className="form-control" name="patientPhone" defaultValue={patient.patientPhone||''} onChange={handleChange}></input>
    </div>
    <div className="form-group">
      <div>우편번호</div>
      <div style={{display:'flex'}}>
        <input style={{width:'200px', marginRight:'10px'}} type="text" className="form-control" value={patient.patientZip||''} name="patientZip" readOnly></input>
        <button type='button' className="btn btn-sm btn-outline-dark" onClick={openPostCode}>우편번호검색</button>
      </div>
      <div id='FindDom'>
                {isPopupOpen && (
                    <FindDom>
                        <PopupPostCode setPatient={setPatient} patient={patient} onClose={closePostCode} />
                    </FindDom>
                )}
        </div>
    </div>
    <div className="form-group">
      <div>주소</div>
      <input type="text" className="form-control" id="patientAddress" name="patientAddress" value={patient.address||''} readOnly></input>
    </div>
    <div className="form-group">
      <div>상세주소</div>
      <input type="text" className="form-control" id="addressDetail" name="addressDetail" defaultValue={patient.addressDetail||''} onChange={handleChange}></input>
    </div>
  </form>
  </div>
  <div style={{display:'flex', justifyContent:'flex-end'}}>
  <button type="submit" className="btn btn-primary" style={{marginTop:'7px', marginRight:'5px'}} onClick={handleBack}>뒤로가기</button>
    <button type="submit" className="btn btn-primary" onClick={handleUpdate} style={{marginTop:'7px'}}>수정완료</button>
  </div>
  </>
    );
}
export default UpdateForm;