import { Container } from "react-bootstrap";
import style from "./reception.module.css";
import RGraph from "./RGraphComponent";
import RDonut from './RDonutComponent';
import { Row } from 'react-bootstrap';
import ReceptionList from "./ReceptionListComponent";

function Reception(props) { 
  return (
    <Container fluid className={style.back}>
      <Row className="ml-1">
        <RGraph/>
        <RDonut/>
      </Row>
      <Row className="ml-3">
        <ReceptionList/>
      </Row>
    </Container>
  );
}

export default Reception;