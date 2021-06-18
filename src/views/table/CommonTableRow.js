import React from 'react';
 
const CommonTableRow = ({ children },props) => {
  return (
    <tr key={props.key}>
      {
        children
      }
    </tr>
  )
}
 
export default CommonTableRow;