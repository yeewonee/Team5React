import React, { useEffect, useState } from 'react'
import DetailTable from './DetailTable/DetailTable';
import './index.css';
import InspectState from './InspectState/InspectState';
import PatientTable from './PatientTable/PatientTable';
import Progress from './Progress/Progress';
import {getInspectList, getPatientList} from "./data"
import { useSelector } from 'react-redux';
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080/";


function Inspection(props) {
    //선택한 환자 pno
    const state = useSelector(state => state.inspectReducer.patient);
    console.log("리렌더링")
    const pno = state.pno
    const [patientList, setPatientList] = useState([]);
    const [categoryArray,setCategoryArray]=useState([]);
    const [inspectLists,setInspectLists] = useState([]);

    const getPatientsList = async() => {
      const result = await axios.get("/inspection");
      
      setPatientList(result.data);
      setCategoryArray(result.data);
    }

    const getInspectsList = async(pno,did) => {
      const result =await axios.get("/inspection/inspectList", {params:{pno,did}})
      setInspectLists(result.data)
    }

    useEffect(() => {
    getPatientsList()
  }, [])

  

  useEffect(()=>{
    getInspectsList(pno,state.did)
  },[state.pno,pno])
    // const patientList = getPatientList();
    //선택한 환자의 검사리스트를 가져옴
    // const inspectList = getInspectList(state?.pno);

    const getUser = (pno) =>{
      const user = patientList.find((idata) => idata.patientId === pno);
      return user;
    }

    let user 
    //state값 비어있을 경우 patientList의 가장 첫번째 환자정보를 보냄
    if(!state){
       user=getUser(patientList[0].patientId)
    }else{
        user=getUser(state.pno);
    }

    let arr=[];
    const changeCategory = (value) => {
        if (value === "전체") {
          setCategoryArray(patientList);
        }
        if (value === "대기") {
          arr = patientList.filter((list) => list.totalIstatus === value);
          setCategoryArray(arr);
        }
        if (value === "진행중") {
          arr = patientList.filter((list) => list.totalIstatus === value);
          console.log(arr);
          setCategoryArray(arr);
        }
        if (value === "완료") {
          arr = patientList.filter((list) => list.totalIstatus === value);
          setCategoryArray(arr);
        }
      };

      const changeKeyword = (arr1)=>{
          setCategoryArray(arr1)
      }
    

    return (
        <div className="middle">
            <div className="middle-left">
                <InspectState data={patientList}/>
                <PatientTable data={patientList} categoryArray={categoryArray} fun={changeCategory} keywordArr={changeKeyword}/>
            </div>
            <div className="middle-right">
                <Progress data={user} list={inspectLists}/>
                <DetailTable data={inspectLists}/>
            </div>
        </div>
    )
}

export default Inspection;
