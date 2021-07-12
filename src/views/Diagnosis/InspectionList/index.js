import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInspectList, getInspectAllList } from "apis/diagnosis";
import style from "./inspectionlist.module.css";
import { createSetAddIlistAction } from "redux/diagnosis-reducer";
import CommonTable from "views/table/CommonTable";
import CommonTableColumn from "views/table/CommonTableColumn";
import { BsCardChecklist } from "react-icons/bs";
import { Loading } from "../../../Loading";
import Swal from 'sweetalert2'


export const InspectionList = React.memo((props) => {

  
  //추가된 검사 목록
  const inspectionList = useSelector((state) => {
    return state.diagnosisReducer.ilist;
  });
  
  const [loading, setLoading] = useState(null);
  console.log("검사목록 렌더링")
  //DB에서 받아온 최초 약 목록
  const [iList, setIlist] = useState(inspectionList);

  const [keywordList, setKeywordList] = useState([]);
  const [inspections, setInspections] = useState([]);

  const inspectList = async () => {
    setLoading(true);
    try {
      const response = await getInspectList();
      setIlist(response.data);
      setKeywordList(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //모든 검사 목록 가져오기
  const inspect = async () => {
    try {
      const response = await getInspectAllList();
      setInspections(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    inspectList();
    inspect();
  }, []);

  //DB에서 약 목록 size 받아오기
  const arr = Array.from({ length: iList.length }, () => false);
  const [checkArray, setCheckArray] = useState(arr);
  const changeCheck = (event, index, bundleCode) => {
    let inspectionArray = list.iList;
    for (let i = 0; i < inspectionArray.length; i++) {
      if (inspectionArray[i].bundleCode === bundleCode && event.target.checked) {
        return;
      }
    }
    let checkarray = checkArray;
    if (event.target.checked) {
      checkarray[index] = true;
    } else {
      checkarray[index] = false;
    }
    setCheckArray(checkarray);
  };

  const [keyword, setKeyword] = useState("");
  const keywordChange = (event) => {
    setKeyword(event.target.value);
  };
  
  const keywordButton = (event) => {
    setCheckArray(arr);
    if (keyword === "") {
      //검색어가 없으면
      setKeywordList(iList.filter(iList => iList.bundleName !== keyword));
    } else {
      setKeywordList(iList.filter(iList => iList.bundleName.includes(keyword)));
    }
  };

  const [list, setList] = useState({
    iList: [],
  });

  useEffect(() => {
    setList({
      iList: inspectionList,
    });
  }, [inspectionList, keyword]);

  const inspectionClick = (event, bundleCode) => {
    let inspectionArray = list.iList;
    for (let i = 0; i < inspectionArray.length; i++) {
      if (inspectionArray[i].bundleCode === bundleCode && event.target.checked) {
        Swal.fire({
          icon: 'error',
          text: '이미 추가된 항목입니다.',
          confirmButtonColor: '#3085d6'
        })
        return;
      }
    }

    if (event.target.checked) {
      //묶음코드에 맞는 검사 리스트를 불러와 그 리스트들을 임시상태에 저장
      let tempList = []
      for(let i=0; i<inspections.length; i++){
        if(inspections[i].bundleCode === bundleCode){
          tempList.push(inspections[i]);
        }
      }
      setList((prevList) => {
        return {
          ...prevList,
          iList: prevList.iList.concat(tempList),
        };
      });
    } else {
      setList((prevList) => {
        return {
          ...list,
          iList: list.iList.filter((item) => {
            return item.bundleCode !== bundleCode;
          }),
        };
      });
    }
  };

  const dispatch = useDispatch();
  const addInspection = (event) => {
    dispatch(createSetAddIlistAction(list.iList));
    //DB에서 size 가져오기
    let checkarray = arr;
    setCheckArray(checkarray);
  };

  return (
    <>
      <div className={style.i_list_container}>
        <div className="d-flex justify-content-between">
          <div className="input-group m-1">
            <input type="text" name="keyword" onChange={keywordChange} value={keyword} />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary btn-sm" type="button" onClick={keywordButton}>
                검색
              </button>
            </div>
          </div>
          <div className="mr-1 mt-1">
            <input type="button" className="btn btn-sm" style={{ backgroundColor: "#4dabf7", color: "white" }} value="추가" onClick={addInspection} />
          </div>
        </div>

      {loading ?
      <>
      <div style={{marginTop:'5%', marginLeft:'45%'}}> 
        <Loading height={30} width={30}/>
      </div> 
      <p style={{marginLeft:'43%'}}>Loading..</p>
      </>
      :
      <>
        {keywordList.length !== 0 ? (
          <div className={style.i_list}>
            <CommonTable headersName={["", "그룹코드", "그룹명"]} tstyle={"table table-sm"}>
              {keywordList.map((inspection, index) => (
                <tr key={inspection.bundleCode} className={checkArray[index] ? style.select_Color : style.basic_Color}>
                  <CommonTableColumn>
                    <input
                      type="checkbox"
                      onChange={(event) => {
                        changeCheck(event, index, inspection.bundleCode);
                      }}
                      checked={checkArray[index] || ""}
                      onClick={(event) => inspectionClick(event, inspection.bundleCode)}
                      style={{ zoom: "1.2", paddingTop: "2px" }}
                    />
                  </CommonTableColumn>
                  <CommonTableColumn>{inspection.bundleCode}</CommonTableColumn>
                  <CommonTableColumn>{inspection.bundleName}</CommonTableColumn>
                </tr>
              ))}
            </CommonTable>
          </div>
        ) : (
          <div className={style.p_list}>
            <div style={{ borderTop: "1px solid #e7f5ff", height: "100%" }}>
              <div style={{ paddingLeft: "46%", paddingTop: "5%" }}>
                <BsCardChecklist size={"3em"} />
              </div>
              <p style={{ textAlign: "center", fontSize: "1em" }}>일치하는 검사가 없습니다.</p>
            </div>
          </div>
        )}</>}
      </div>
    </>
  );
});
