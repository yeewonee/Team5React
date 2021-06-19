import React from "react";
import style from "./inspectionresult.module.css";

export const InspectionResult = () => {
  return (
    <>
      <div className={`${style.left_list_size} m-1`}>
        <div className={style.title}>
        <p className={`${style.title_p} font-weight-bold ml-1 mb-0 pt-1`}>검사 처방</p>
        </div>
        <div className={style.inspection_container}>
          <table className="table text-center table-sm">
            <thead>
              <tr>
                <th>처방코드</th>
                <th>처방명</th>
                <th>단위</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>L2010</td>
                <td>WBC</td>
                <td>x10^3/mm3</td>
                <td>
                  <button className="btn btn-danger btn-sm">삭제</button>
                </td>
              </tr>
              <tr>
                <td>L2011</td>
                <td>RBC</td>
                <td>x10^6/mm3</td>
                <td>
                  <button className="btn btn-danger btn-sm">삭제</button>
                </td>
              </tr>
              <tr>
                <td>L2012</td>
                <td>hB</td>
                <td>g/dL</td>
                <td>
                  <button className="btn btn-danger btn-sm">삭제</button>
                </td>
              </tr>
              <tr>
                <td>L2013</td>
                <td>Hct</td>
                <td>%</td>
                <td>
                  <button className="btn btn-danger btn-sm">삭제</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
