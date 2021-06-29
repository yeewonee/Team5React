import React from 'react'
import classNames from "classnames/bind";
import style from "./Progress.module.css";
import { useSelector } from 'react-redux';


const cx =  classNames.bind(style);

function Progress(props){

    const user = props.data;
    const inspectList = props.list;
    const completeList=inspectList.filter((value)=>value.istatus==='완료');
    useSelector(state => state.inspectReducer.checked)
    let progress = Math.floor((completeList.length/inspectList.length)*100 ) 
    let percent = String(progress).concat('%')
    
    if(!progress){
        progress=0;
        percent=0;
    }

     const proceeding = inspectList.find((value)=>value.istatus==='접수')

    return (
        <div>
        <div className={cx(style.middle_right_top)}>
          <div className={cx(style.patientProgress)}>   
                    <div className="progress-title m-2" style={{fontSize: '18px', fontWeight:'bold'}}>검사 진행률</div>
                        <div className="progress rounded-pill" style={{width:'100%',height: '25px', marginRight: '0'}}>
                            <div className="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" style={{ width:percent }}>{progress}%</div>
                        </div>
                        <div className={cx(style.progressStatus)}>
                            <ul>
                                <li>총 검사 : {inspectList.length}건 </li>
                                <li>완료 : {completeList.length}건</li>
                            </ul>
                        </div>
                        <div className={cx(style.inspectName)}>
                            <div>현재 진행중인 검사</div>
                            {proceeding!==undefined?<div>▶ {proceeding.iname}</div>:<div>▶ 진행중인 검사가 없습니다.</div>}
                        </div>
                </div>
                <div className={cx(style.percentData)}>
                    <div className={cx(style.progress_percent)}>{progress}%</div>
                </div>
                <div className={cx(style.patientInfo)}>
                    <div className={cx(style.info,'mt-3')}>
                        <div className="ml-3 mb-1">번호 : {user?.pno} </div>
                        <div className="ml-3 mb-1">성명: {user?.pname}</div>
                        <div className="ml-3 mb-1">성별 : {user?.sex}</div>
                        <div className="ml-3 mb-1">나이 : {user?.age}</div>
                        <div className="ml-3 mb-1">예약시간 : {user?.rtime}</div>
                      </div>
            </div>
        </div>
    </div>
    )
}

export default Progress
