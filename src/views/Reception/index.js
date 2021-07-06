import style from "./reception.module.css";
import RGraph from "./RGraphComponent";
import RDonut from './RDonutComponent';
import ReceptionList from "./ReceptionListComponent";
import { useState } from "react";
function Reception(props) { 
    // 예약취소
    const [cBoolean, setCBoolean] = useState(false);
    // 접수완료
    const [comBoolean, setComBoolean] = useState(false);
  return (
    <div className={style.back}>
      <div className={style.border1}>
        <RGraph/>
      </div>
      <div className={style.border2}>
        <RDonut
        setCBoolean={setCBoolean}
        setComBoolean={setComBoolean}
        cBoolean={cBoolean}
        comBoolean={comBoolean}
        />
      </div>
      <div className={style.border3}>
        <ReceptionList
        setCBoolean={setCBoolean}
        setComBoolean={setComBoolean}
        cBoolean={cBoolean}
        comBoolean={comBoolean}
        />
      </div>
    </div>
  );
}

export default Reception;