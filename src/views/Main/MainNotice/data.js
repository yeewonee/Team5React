let data = [
  {bno:1, btitle: '2021년 6월 28일 업데이트 내용', bcontent:'이번주 업데이트 내용입니다...', bdate:'2021-06-28', bwriter:'더존비즈온'},
  {bno:2, btitle: '2021년 6월 1일 업데이트 내용', bcontent:'이번주 업데이트 내용입니다...', bdate:'2021-06-01', bwriter:'더존비즈온'},
  {bno:3, btitle: 'wehago-h 이용안내', bcontent:'이용 안내 사항입니다.', bdate:'2021-06-28', bwriter:'더존비즈온'},
  {bno:4, btitle: '고객센터 이용안내', bcontent:'문의사항이 생기시면 연락주세요 :)', bdate:'2021-06-28', bwriter:'더존비즈온'}
]

export function getMainNoticeList(){
  var mainNotice = data;
  return mainNotice;
};