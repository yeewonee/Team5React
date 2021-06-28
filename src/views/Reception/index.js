import style from "./reception.module.css";
import RGraph from "./RGraphComponent";
import RDonut from './RDonutComponent';
import ReceptionList from "./ReceptionListComponent";
function Reception(props) { 
  return (
    <div className={style.back}>
      <div className={style.border1}>
        <RGraph/>
      </div>
      <div className={style.border2}>
        <RDonut/>
      </div>
      <div className={style.border3}>
        <ReceptionList/>
      </div>
    </div>
  );
}

export default Reception;