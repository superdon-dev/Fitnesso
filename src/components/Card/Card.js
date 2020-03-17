import React from 'react'
import './Card.css';
import Chart from './Chart/Chart';
import {Row, Col} from 'react-bootstrap';
function Card(props) {
    let calculateDays = function(timing){
        var startDate =  new Date().toISOString();
        var endDate = timing;
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        const milliseconds = Math.abs(end - start).toString()
        const seconds = parseInt(milliseconds / 1000);
        const minutes = parseInt(seconds / 60);
        const hours = parseInt(minutes / 60);
        const days = parseInt(hours / 24);
        // const time = days + ":" + hours % 24 + ":" + minutes % 60 + ":" + seconds % 60;
        if(days>0){
            if(days===1){
                return days + " day";
            }
            return days + " days";
        }
        if(hours===1){
            return hours + " hour";
        }
        return hours + " hours";
    }
    let getDate = function(timing){
        let date = new Date(timing).toString();
        let time = date.slice(0,4) + " " + date.slice(16,21);
        return time;
    }
    let calculatePercentage = function(timing){
        let days = calculateDays(timing);
        let prefix = days.split(' ')[0];
        let postfix = days.split(' ')[1];
        let percent = 100 - Math.floor((prefix / 168)*100);
        if(postfix==="days" || postfix==="day"){
            percent = 100 - Math.floor((prefix*24 / 168) * 100);
        }
        return percent;
    }
    return (
        <div className="Card">
            <Row>
            <Col xs="7">
                <h5>{props.training}</h5>
                <p><i className="fa fa-calendar mr-2"/>{getDate(props.timing)}</p>
                <p><i className="fa fa-map-marker mr-2"/>{props.place}</p>
            </Col>
            <Col xs="5" className="mt-1">
                <Chart percentage={calculatePercentage(props.timing)} timing={calculateDays(props.timing)}/>
            </Col>
            </Row>
        </div>
    )
}

export default Card
