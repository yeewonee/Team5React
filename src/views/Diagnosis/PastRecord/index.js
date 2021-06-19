import React from "react";
import style from "./pastrecord.module.css";
import Modal from "./pastModal";
import { useState } from "react";

export const PastRecord = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className={`${style.past_container} mr-2`}>
        <div className="d-flex justify-content-center">
          <div className={`${style.past_container2} mt-1`}>
            <div className={style.title}>
            <p className={`${style.title_p} font-weight-bold ml-1 mb-0 pt-1`}>과거 기록</p>
            </div>
            <div className={style.past_table_container}>
              <table className="table table-striped text-center table-sm">
                <thead>
                  <tr>
                    <th>진료 날짜</th>
                    <th>상세</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2021-06-15</td>
                    <td>
                      <button type="button" className="btn btn-dark btn-sm" onClick={openModal}>
                        상세보기
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row-reverse bd-highlight pt-3">
          <button className="btn btn-outline-dark mr-3">전달</button>
          <button className="btn btn-outline-dark mr-3">임시 저장</button>
        </div>
      </div>

      {/* 과거기록 상세보기 modal */}
      <Modal open={modalOpen} close={closeModal} header="검사결과 확인">
        <div className={style.past_title}>환자 정보</div>
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>환자번호</th>
              <th>환자이름</th>
              <th>주민번호</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>121651</td>
              <td>김명휘</td>
              <td>951115-1xxxxxx</td>
            </tr>
          </tbody>
        </table>

        <div className={style.past_title}>내원일 정보</div>
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>내원일자</th>
              <th>진료실</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2021-06-16</td>
              <td>1진료실</td>
            </tr>
          </tbody>
        </table>
        
        <div className={style.past_title}>결과 확인</div>
        <hr />

        <div className={style.past_title2}>검사 결과</div>
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>처방코드</th>
              <th>검사명</th>
              <th>검사담당자</th>
              <th>결과</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>E7401</td>
              <td>순환기능검사</td>
              <td>정예원</td>
              <td>17</td>
            </tr>
            <tr>
              <td>D0012</td>
              <td>백혈구백분율</td>
              <td>정예원</td>
              <td>45</td>
            </tr>
          </tbody>
        </table>

        <div className={style.past_title2}>약 처방</div>
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>코드</th>
              <th>명칭</th>
              <th>구분</th>
              <th>단위</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>NIZA15</td>
              <td>AXID Cap 150mg</td>
              <td>내복약	</td>
              <td>C</td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </div>
  );
};
