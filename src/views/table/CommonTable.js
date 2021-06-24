import React from 'react';

function CommonTable(props){
    const {headersName,children,tstyle} = props

    return (
        <table className={tstyle} style={{borderRadius: '3px'}}>
          <thead style={{backgroundColor:'#a5d8ff', textAlign:'center'}}>
            <tr>
              {
                headersName.map((item, index) => {
                  return (
                    <th scope="col" key={index}>{ item }</th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody style={{textAlign:'center'}}>
            {
              children
            }
          </tbody>
        </table>
      )
}

export default CommonTable;