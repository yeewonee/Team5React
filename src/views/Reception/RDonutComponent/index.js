import { PieChart } from 'react-minimal-pie-chart';
import style from './donut.module.css';
function RDonut(props){
  const piedata =[
    { title: '접수 대기', value: 30, color: 'orange', key:1},
    { title: '접수 완료', value: 70, color: 'skyblue', key:2},
    ]
  
  return(
    <>
      <div className={style.donut}>
        <PieChart
        data={piedata}
        key={piedata.key}
        lineWidth={80}
        animate={true}
        label={({ x, y, dx, dy, dataEntry }) => (
          <text
            x={x}
            y={y}
            dx={dx}
            dy={dy}
            dominantBaseline="central"
            textAnchor="middle"
            style={{
              fontSize: '10px',
              fontFamily: 'DoHyeon-Regular'
            }}
          >
            {`${dataEntry.value}`}
          </text>
        )}
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


