let lastBno = 15;

let data = [
{sequence:1, pno:'12345', pname:"환자"+2, sex:"male", age:33,rtime:'15:00'},
{sequence:2, pno:'2234', pname:"환자"+3, sex:"female", age:17,rtime:'16:00'},
{sequence:3, pno:'546546', pname:"환자"+4, sex:"male", age:55,rtime:'17:00'},
{sequence:4, pno:'76543', pname:"환자"+5, sex:"male", age:60,rtime:'18:00'},
{sequence:5, pno:'98643', pname:"환자"+6, sex:"male", age:31,rtime:'18:00'},
{sequence:6, pno:'47243', pname:"환자"+7, sex:"female", age:76,rtime:'19:00'},
{sequence:7, pno:'90612', pname:"환자"+8, sex:"male", age:87,rtime:'20:00'},
{sequence:8, pno:'63879', pname:"환자"+9, sex:"female", age:22,rtime:'21:00'},
{sequence:9, pno:'19843', pname:"환자"+10, sex:"male", age:34,rtime:'18:00'},
{sequence:10, pno:'21345', pname:"환자"+11, sex:"female", age:30,rtime:'09:00'},
{sequence:11, pno:'34712', pname:"환자"+12, sex:"male", age:38,rtime:'10:00'},
{sequence:12, pno:'58433', pname:"환자"+13, sex:"male", age:42,rtime:'13:00'},
{sequence:13, pno:'22345', pname:"환자"+14, sex:"female", age:53,rtime:'12:00'},

];

let data2=[
    {pno:'12345', bno:'L2001', iname:'WBC',ino:'L2010',unit:'x10^3/mm3',inspector:"김명휘",istatus:"완료"},
    {pno:'12345', bno:'L2001', iname:'WBC',ino:'L2011',unit:'x10^3/mm3',inspector:"김명휘",istatus:"진행중"},
    {pno:'12345', bno:'L2001', iname:'WBC',ino:'L2012',unit:'x10^3/mm3',inspector:"김명휘",istatus:"대기"},
    {pno:'12345', bno:'L2001', iname:'WBC',ino:'L2013',unit:'x10^3/mm3',inspector:"김명휘",istatus:"대기"},
    {pno:'12345', bno:'L3001', iname:'WBC',ino:'L2014',unit:'x10^3/mm3',inspector:"김명휘",istatus:"대기"},
    {pno:'12345', bno:'L3001', iname:'WBC',ino:'L2015',unit:'x10^3/mm3',inspector:"김명휘",istatus:"대기"},
    {pno:'12345', bno:'L3001', iname:'WBC',ino:'L2016',unit:'x10^3/mm3',inspector:"김명휘",istatus:"대기"},
    {pno:'63879', bno:'L2001', iname:'WBC',ino:'L2017',unit:'x10^3/mm3',inspector:"정윤환",istatus:"대기"},
    {pno:'63879', bno:'L2001', iname:'WBC',ino:'L2018',unit:'x10^3/mm3',inspector:"정윤환",istatus:"대기"},
    {pno:'63879', bno:'L2201', iname:'WBC',ino:'L2019',unit:'x10^3/mm3',inspector:"정윤환",istatus:"진행중"},
    {pno:'63879', bno:'L2201', iname:'WBC',ino:'L2020',unit:'x10^3/mm3',inspector:"정윤환",istatus:"대기"},
    {pno:'63879', bno:'L2201', iname:'WBC',ino:'L2021',unit:'x10^3/mm3',inspector:"정윤환",istatus:"대기"},
    {pno:'2234', bno:'L5001', iname:'WBC',ino:'L2022',unit:'x10^3/mm3',inspector:"김명휘",istatus:"대기"},
    {pno:'2234', bno:'L5001', iname:'WBC',ino:'L2023',unit:'x10^3/mm3',inspector:"김명휘",istatus:"대기"},
    {pno:'2234', bno:'L5001', iname:'WBC',ino:'L2024',unit:'x10^3/mm3',inspector:"김명휘",istatus:"대기"},
    {pno:'2234', bno:'L5001', iname:'WBC',ino:'L2025',unit:'x10^3/mm3',inspector:"김명휘",istatus:"대기"},


]


export function getBoardList() {
    data.sort((a, b) => a.sequence-b.sequence);  
    var boardList = data.slice(0, data.length);
    return boardList;
  };

  export function getUser(pno) {
    const user = data.find(idata=> idata.pno ===pno);
    return user;
  };

  export function getInspectList(pno) {
    data.sort((a, b) => a.sequence-b.sequence);  
    const inspectList = data2.filter(idata=>idata.pno===pno);
    return inspectList;
  };