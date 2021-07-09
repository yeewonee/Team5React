import React from 'react'
import Loader from 'react-loader-spinner'

export const Loading = () => {
    return (
        <div style={{marginLeft:'45%', marginTop:'15%'}}>
            <Loader
                type="Oval"
                color="#3d66ba"
                height={90}
                width={90}
                timeout={9000}
            />
            <p style={{marginLeft:'20px'}}>Loading...</p>
        </div>
    )
}
