import { Row } from 'react-bootstrap';
import { PieChart } from 'react-minimal-pie-chart';
import style from './donut.module.css';
function RDonut(props){
  return(
    <>
      <Row className={style.donut}>
        <PieChart
        data={[
        { title: '접수 대기', value: 30, color: 'orange' },
        { title: '접수 완료', value: 70, color: 'skyblue' },
        ]}
        lineWidth={80}
        animate={true}
        label={({ x, y, dx, dy, dataEntry }) => (
          <text
            x={x}
            y={y}
            dx={dx}
            dy={dy}
            dominant-baseline="central"
            text-anchor="middle"
            style={{
              fontSize: '10px',
              fontFamily: 'sans-serif'
            }}
          >
            {`${dataEntry.value}`}
          </text>
        )}
        />
        <Row className={style.span}>
            <div className={style.square1}></div>&nbsp;접수 대기 : 30&emsp;&emsp;
        </Row>
        <Row className={style.span}>
            <div className={style.square2}></div>&nbsp;접수 완료 : 70
        </Row>
      </Row>

    </>
  );
}

export default RDonut;


