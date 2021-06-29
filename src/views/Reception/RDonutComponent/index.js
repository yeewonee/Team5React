import { Doughnut } from 'react-chartjs-2';
import style from './donut.module.css';
import getDonutData from './data';
function RDonut(props){
  
  const expData = {
    datasets: [
      {
        data: getDonutData(),
        backgroundColor: [
          "orange",
          "skyblue"
        ],
        hoverOffset: 2,
      },
    ],
  };
  
  return(
    <>
      <div className={style.donut}>
        <Doughnut
            data={expData}
            width={340}
            height={160}
            options={{
              maintainAspectRatio: false,
              animation:true
            }}
          />
        <div className={style.span1}>
            <div className={style.square1}></div><div>&nbsp;접수 대기 : 30</div>
        </div>
        <div className={style.span1}>
            <div className={style.square2}></div><div>&nbsp;접수 완료 : 70</div>
        </div>
      </div>

    </>
  );
}

export default RDonut;


