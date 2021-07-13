import React from 'react'
import Loader from 'react-loader-spinner'

export const Loading = (props) => {
    return (
        <div>
            <Loader
                type="Oval"
                color="#3d66ba"
                height={props.height}
                width={props.width}
                timeout={30000}
            />
        </div>
    )
}
