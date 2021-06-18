import React from 'react';

function CommonTable(props){
    const {headersName,children} = props

    return (
        <table className="table table-sm table-striped" style={{borderRadius: '3px'}}>
          <thead style={{backgroundColor:'#d0ebff', textAlign:'center'}}>
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