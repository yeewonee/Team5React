import React from "react";
import { Cal } from "./Cal";
import style from "./diagnosis.module.css";
import { InspectionList } from "./InspectionList";
import { InspectionResult } from "./InspectionResult";
import { MedicineList } from "./MedicineList";
import { MedicineResult } from "./MedicineResult";
import { Memo } from "./Memo";
import { PastRecord } from "./PastRecord";
import { PatientList } from "./PatientList";


function Diagnosis(props) {
  return (
    <div style={{fontFamily:"DoHyeon-Regular"}}>
      <div className={style.d_container}>
        <div className="d-flex justify-content-center">
          <div className={style.left_container}>
            <div className="d-flex justify-content-center">
              <Memo/>
              <Cal />
            </div>

            <div className="d-flex justify-content-center">
              <MedicineList />
              <InspectionList />
              
            </div>
            
            <div className="d-flex justify-content-center">
              <MedicineResult />
              <InspectionResult />
             
            </div>
          </div>

          <div className={style.right_container}>
            <div className={`${style.patientlist} m-1`}>
            
              <PatientList />
              <PastRecord />
            
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Diagnosis;
