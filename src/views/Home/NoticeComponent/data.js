const boards= [
  {bno:8, btitle:"제목8", bcontent:"내용8", bwriter:"정윤환"},
  {bno:7, btitle:"제목7", bcontent:"내용7", bwriter:"박소라"},
  {bno:6, btitle:"제목6", bcontent:"내용6", bwriter:"김명휘"},
  {bno:5, btitle:"제목5", bcontent:"내용5", bwriter:"정윤환"},
  {bno:4, btitle:"제목4", bcontent:"내용4", bwriter:"정예원"},
  {bno:3, btitle:"제목3", bcontent:"내용3", bwriter:"정예원"},
  {bno:2, btitle:"제목2", bcontent:"내용2", bwriter:"정예원"},
  {bno:1, btitle:"제목1", bcontent:"내용1", bwriter:"정예원"},
];

export const getBoardList = (pageNo) => {
  boards.sort((a, b) => b.bno-a.bno);  
  if(!pageNo) pageNo = 1;
  const start = (pageNo - 1) * 5;
  const end = pageNo * 5;
  var boardList = boards.slice(start, end);
  return boardList;
};