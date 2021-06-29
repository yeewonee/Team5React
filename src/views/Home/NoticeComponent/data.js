const boards= [
  {bno:8, btitle:"2021년 심폐소생술 등 응급처치 교육 신청 안내", bcontent:"2021년 심폐소생술 등 응급처치 교육 신청 안내문입니다.", bwriter:"정윤환"},
  {bno:7, btitle:"공공보건의료 워킹스루 주간행사", bcontent:"공공보건의료 워킹스루 주간행사 안내드립니다.", bwriter:"박소라"},
  {bno:6, btitle:"2021년 공공기관 고객만족도 조사 관련 개인정보 제3자 제공 알림", bcontent:"2021년 공공기관 고객만족도 조사 관련 개인정보 제3자 제공 알림 관련 내용입니다.", bwriter:"김명휘"},
  {bno:5, btitle:"인공지능을 활용한 대학교병원 챗봇 오픈", bcontent:"인공지능을 활용한 대학교병원 챗봇 오픈 예정입니다.", bwriter:"정윤환"},
  {bno:4, btitle:"국민건강보험공단 '착한 마법, 올바른 마스크 착용법' 캠페인 안내", bcontent:"국민건강보험공단 '착한 마법, 올바른 마스크 착용법' 캠페인 안내드립니다.", bwriter:"정예원"},
  {bno:3, btitle:"개인정보처리 '업무위탁'", bcontent:"개인정보처리 '업무위탁' 안내드립니다.", bwriter:"정예원"},
  {bno:2, btitle:"시민건강증진실 비대면(언택트)운영 안내", bcontent:"시민건강증진실 비대면(언택트)운영 안내드립니다.", bwriter:"정예원"},
  {bno:1, btitle:"코로나19 관련 협조 안내", bcontent:"코로나19 관련 협조 안내드립니다.", bwriter:"정예원"},
];

export const getBoardList = (pageNo) => {
  boards.sort((a, b) => b.bno-a.bno);  
  if(!pageNo) pageNo = 1;
  const start = (pageNo - 1) * 5;
  const end = pageNo * 7;
  var boardList = boards.slice(start, end);
  return boardList;
};