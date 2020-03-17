import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import './Chart.css';
function Chart(props) {
    return (
        <CircularProgressbar  value={props.percentage} text={props.timing} />
    )
}

export default Chart
