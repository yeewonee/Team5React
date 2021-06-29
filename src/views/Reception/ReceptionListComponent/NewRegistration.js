import style from './rlist.module.css';
import { Button, Modal } from 'react-bootstrap';
import FindAddrDom from './PostCodeComponent/FindAddrDom';
import FindAddr from './PostCodeComponent/FindAddr';
import { useState } from 'react';

const NewRegistration = (props) => {
  const [addressValue, setAddressValue] = useState({
    zoneCode: "",
    address: ""
  });
  
  return(
    <Modal show={props.show} onHide={props.handleClose} className={style.font} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>신규환자 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table calss="table">
            <tbody>
              <tr className={style.table}>
                <th className={style.tr1}>&nbsp;환자이름<input type="text" className={style.inputtext1}/></th>
                <th className={style.tr2}>&nbsp;주민번호 <input type="text" className={style.inputtext2}/>&nbsp;&nbsp;-<input type="text" className={style.inputtext2}/></th>
              </tr>
              <tr>
                <th className={style.tr1}>&nbsp;성별<input type="text" className={style.inputsex}/></th>
                <th className={style.tr1}>&nbsp;나이<input type="text" className={style.inputage}/></th>  
              </tr>
              <tr>
                <th colSpan="2" className={style.tr1}>&nbsp;전화번호<input type="text" className={style.inputtext3}/></th>
              </tr>
              <tr>
                <th className={style.tr1}>&nbsp;우편번호<input type="text" className={style.inputtext1} value={addressValue.zoneCode} readOnly/></th>
                <th className={style.tr1}>   
                  <div>
                    &nbsp;<button className="btn btn-sm btn-light" onClick={props.openPostCode}>우편번호 검색</button>

                  </div>   
                </th>             
              </tr>
              <tr>
                <th colSpan="2" className={style.tr1}>&nbsp;주소<input type="text" className={style.inputaddress} value={addressValue.address} readOnly/></th>
              </tr>
              <tr>
                <th colSpan="2" className={style.tr1}>&nbsp;상세주소<input type="text" className={style.inputtext3}/></th>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <div id='FindAddrDom'>
            {props.isPopupOpen && (
                <FindAddrDom>
                    <FindAddr setAddressValue={setAddressValue} onClose={props.closePostCode} />
                </FindAddrDom>
            )}
          </div>
          <Button style={{backgroundColor:'#4dabf7'}} onClick={props.handleClose}>
            확인
          </Button>
          <Button style={{backgroundColor:'#f74d4d'}} onClick={props.handleClose}>
            취소
          </Button>
        </Modal.Footer>
        <style jsx="true" global="true">{`
            .custom-modal {
              font-family: "DoHyeon-Regular"; 
            }
          `}
        </style>
      </Modal>
  )
}

export default NewRegistration;