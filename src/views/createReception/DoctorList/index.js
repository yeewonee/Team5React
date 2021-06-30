import { getDoctorList, getDoctorListBySearch } from "./data";
import style from "./style.module.css";
import CommonTable from "views/table/CommonTable";
import CommonTableColumn from "views/table/CommonTableColumn";
import { useDispatch, useSelector } from "react-redux";
import { createSetDoctor } from "redux/createReception-reducer";
import { useState } from "react";
import { FaUserTimes } from 'react-icons/fa';

function DoctorList(props) {
  const originDoctorList = getDoctorList();
  const [doctorList, setDoctorList] = useState(originDoctorList);

  const dispatch = useDispatch();
  const did = useSelector((state) => {
    return state.createReceptionReducer.doctor_id
  });

  const arr = Array.from({length: doctorList.length}, () => false);
  const [checkArray,setCheckArray] = useState(arr);

  const changeCheck = (event,index,id) =>{
    if(did === id){ //현재 리덕스에 담긴 의사id와 일치한 id를 클릭하면 더 이상 클릭되지 않도록 처리
      return
    }
    let checkarray = checkArray
    if(event.target.value==="on"){
      dispatch(createSetDoctor(id));
      checkarray = arr;
      checkarray[index] = true;
    }
    setCheckArray(checkarray);
  }



  const [searchword, setSearchword] = useState('');
  const serachChange = (event) => {
    setSearchword(event.target.value);
  };

  const searchDoctor = (event) => {
    const doctorBySearch = getDoctorListBySearch(searchword);
    setCheckArray(arr);
    dispatch(createSetDoctor('')); //검색버튼 누르면 이전에 체크됐던 값 지워줌
    if(searchword===''){ //검색어가 없으면
      setDoctorList(originDoctorList); //list에 전체 목록 넣어주고
    }else{ //검색어가 있으면
      setDoctorList(doctorBySearch); //list에 검색어에 맞는 목록 넣음
    }
  };

  return(
    <div className={style.i_list}>
          <div className="input-group m-2">
            <input type="text" placeholder="의사 검색" onChange={serachChange} value={searchword}></input>
            <div className="input-group-append">
                <button className="btn btn-outline-secondary btn-sm" type="button" onClick={searchDoctor}>검색</button>
            </div>
          </div>
          
          {doctorList.length !== 0 ?
          <div className={style.table_wrapper}>
          <CommonTable headersName={['', '의사번호', '이름', '진료실', '전화번호']} tstyle={"table table-sm"}>
            {doctorList.map((doctor, index) => (
              <tr key={doctor.doctor_id} style={{backgroundColor: doctor.doctor_id===did ? '#d0ebff' : ''}}>
                  <CommonTableColumn><input type="checkbox" name='doctor' onChange={(event)=>{changeCheck(event, index, doctor.doctor_id)}}  checked={checkArray[index]||''}  ></input></CommonTableColumn>
                  <CommonTableColumn>{doctor.doctor_id}</CommonTableColumn>
                  <CommonTableColumn>{doctor.doctor_name}</CommonTableColumn>
                  <CommonTableColumn>{doctor.doctor_office}</CommonTableColumn>
                  <CommonTableColumn>{doctor.doctor_phone}</CommonTableColumn>
              </tr>
              ))}
          </CommonTable>
          </div>
          :
          <div>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column',height:'25vh'}}>
              <div><FaUserTimes size={'5em'}/></div>
              <div style={{marginTop:'15px',fontSize:'20px'}}>일치하는 의사가 없습니다.</div>
            </div>  
          </div>
        }
      </div>
  );
}

export default DoctorList;