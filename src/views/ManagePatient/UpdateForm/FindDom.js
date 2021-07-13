import ReactDOM from 'react-dom';
 
const FindDom = ({ children }) => {
    const el = document.getElementById('FindDom');
    return ReactDOM.createPortal(children, el);
};
 
export default FindDom;