import React from 'react'
import DetailTable from './DetailTable/DetailTable';
import './index.css';
import InspectState from './InspectState/InspectState';
import PatientTable from './PatientTable/PatientTable';
import Progress from './Progress/Progress';
import {getInspectList, getPatientList, getUser} from "./data"
import { useSelector } from 'react-redux';


function Inspection(props) {

    const state = useSelector(state => state.inspectReducer.patient);
    const patientList = getPatientList();
    const inspectList = getInspectList(state?.pno);
     let user 
    
    if(!state){
       user=getUser(patientList[0].pno)
    }else{
        user=getUser(state.pno);
    }
    

    return (
        <div className="middle">
            <div className="middle-left">
                <InspectState data={patientList}/>
                <PatientTable data={patientList}/>
            </div>
            <div className="middle-right">
                <Progress data={user} list={inspectList}/>
                <DetailTable data={inspectList}/>
            </div>
        </div>
    )
}

export default Inspection;
