import React from 'react'
import classNames from "classnames/bind";
import style from "./Progress.module.css";
import { useSelector } from 'react-redux';


const cx =  classNames.bind(style);

function Progress(props){

    const user = props.data;
    const inspectList = props.list;
    //완료한 검사항목을 담고 있는 배열 생성
    const completeList=inspectList.filter((value)=>value.iStatus==='완료');
    useSelector(state => state.inspectReducer.checked);
    
    //진행률 퍼센트
    let progress = Math.floor((completeList.length/inspectList.length)*100 );
    //progressBar style에 문자열로 들어가야 하기 때문에 progress와 %를 합친 문자열 생성
    let percent = String(progress).concat('%');

    //progress  undefined일 경우
    if(!progress){
        progress=0;
        percent=0;
    }

    const viewDate = (str) =>{
         console.log(str)
         if(str===undefined){
             return
         }
         const strArr=str.split(" ")
         const hour =strArr[1].substr(0,5)
         return hour 
       }
    
    //진행중인 검사 찾기
    const proceeding = inspectList.find((value)=>value.iStatus==='접수')

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
                            {proceeding!==undefined?<div>▶ {proceeding.iName}</div>:<div>▶ 진행중인 검사가 없습니다.</div>}
                        </div>
                </div>
                <div className={cx(style.percentData)}>
                    <div className={cx(style.progress_percent)}>{progress}%</div>
                </div>
                <div className={cx(style.patientInfo)}>
                    <div className={cx(style.info,'mt-3')}>
                        <div className="ml-3 mb-1">번호 : {user?.patientId} </div>
                        <div className="ml-3 mb-1">성명: {user?.patientName}</div>
                        <div className="ml-3 mb-1">성별 : {user?.patientSex}</div>
                        <div className="ml-3 mb-1">나이 : {user?.patientAge}</div>
                        <div className="ml-3 mb-1">예약시간 : {viewDate(user?.iDate)}</div>
                      </div>
            </div>
        </div>
    </div>
    )
}

export default Progress
