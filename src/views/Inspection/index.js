import React from 'react'
import DetailTable from './DetailTable/DetailTable';
import './index.css';
import InspectState from './InspectState/InspectState';
import PatientTable from './PatientTable/PatientTable';
import Progress from './Progress/Progress';
import {getBoardList,getInspectList, getUser} from "./data"
import { useSelector } from 'react-redux';


function Inspection(props) {

     const state = useSelector(state => state.inspectReducer.pno);
     const boardList = getBoardList();
     const inspectList = getInspectList(state);
     let user 
   
    if(!state){
       user=getUser(boardList[0].pno)
    }else{
        user=getUser(state);
    }
    

    return (
        <div className="middle">
            <div className="middle-left">
                <InspectState/>
                <PatientTable data={boardList}/>
            </div>
            <div className="middle-right">
                <Progress data={user}/>
                <DetailTable data={inspectList}/>
            </div>
        </div>
    )
}

export default Inspection;
