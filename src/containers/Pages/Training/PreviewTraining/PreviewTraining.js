import React, { Component } from 'react'
import { Container, Row, Col, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import Chart from '../../../../components/Card/Chart/Chart';
import { withRouter } from 'react-router-dom';
import './PreviewTraining.css';
import * as actions from '../../../../store/actions/exports';
export class PreviewTraining extends Component {
    onDeleteHandler = (event,tId) => {
        event.preventDefault();
        this.props.trainingDelete(tId);
        this.props.history.push('/add-training');
    }
    render() {
        let training = this.props.trainings[this.props.match.params.id];
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
            <div className="TrainingInfo">
                <Container className="Content">
                    <h4>Training Preview</h4>
                    <h6>({training.practitionerFullname})</h6>
                    <Row>
                        <Col xs={12} md={8} lg={8}>
                            <p><i className="fas fa-dumbbell mr-2"></i><strong>Training:</strong> {training.type}</p>
                            <p><i className="fas fa-calendar-alt mr-2"></i><strong>Date:</strong> {training.time.slice(0,10)}</p>
                            <p><i className="fas fa-clock mr-2"></i><strong>Time:</strong> {training.time.slice(11,16)}</p>
                            <p><i className="fas fa-signal mr-2"></i><strong>Intensity:</strong> {training.intensity}</p>
                        </Col>
                        <Col xs={12} md={4} lg={4} className="Chart pt-4">
                            <Chart percentage={calculatePercentage(training.time)} timing={calculateDays(training.time)}/>
                        </Col>
                    </Row>
                    <Row className="Buttons">
                        <Col xs={12} md={6}>
                            <Button className="btn btn-block btn-warning text-white mb-2" onClick={this.props.history.goBack}>
                                <i className="fas fa-reply mr-2"></i>
                                Back
                            </Button>
                        </Col>
                        <Col xs={12} md={6}>
                            <Button className="btn btn-block btn-danger mb-2" onClick={(event) => this.onDeleteHandler(event, training.tId)}>
                                <i className="fas fa-trash-alt mr-2"></i>
                                Remove
                            </Button>
                    </Col>
                    </Row>
                </Container>
                
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        trainings: state.trainings.trainings,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        trainingDelete: (tId) => dispatch(actions.trainingDelete(tId)), 
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(PreviewTraining))
