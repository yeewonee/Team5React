import ReactDOM from 'react-dom';

const FindAddrDom = ({ children }) => {
    const el = document.getElementById('FindAddrDom');
    return ReactDOM.createPortal(children, el);
};
 
export default FindAddrDom;