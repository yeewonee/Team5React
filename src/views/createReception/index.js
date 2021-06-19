import PatientList from "./PatientList";
import DoctorList from "./DoctorList";
import CheckCalendar from "./CheckCalendar";
import CheckTime from "./CheckTime";
import AddReception from "./AddReception";
function createReception(props) {
  return(
    <div style={{fontFamily: "DoHyeon-Regular"}}>
      <div style={{marginLeft:'10px', paddingTop: '5px', paddingBottom: '5px'}}>
        <span style={{fontSize:'20px', color:'#495057'}}>예약 등록</span>
      </div>
      <div style={{display: 'flex'}}>
        <div style={{flexBasis: '40%', marginLeft:'20px', marginRight:'7px'}}>
          <PatientList/>
          <DoctorList/>
        </div>

        <div style={{flexBasis:'25%', marginRight:'7px'}}>
          <CheckCalendar/>
          <CheckTime/>
        </div>

        <div style={{flexBasis:'32%'}}>
          <AddReception/>
        </div>

      </div>
    </div>
  );
}

export default createReception;