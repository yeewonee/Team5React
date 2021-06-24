import React from 'react';
 
const CommonTableRow = ({ children },props) => {
    console.log(props)
  return (
    <tr key={props.key} >
      {
        children
      }
    </tr>
  )
}
 
export default CommonTableRow;