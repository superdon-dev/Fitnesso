import React from 'react'
import './Alert.css';
function Alert(props) {
    return (
        <div className="Alert">
           <strong>{props.message}</strong> 
        </div>
    )
}

export default Alert
