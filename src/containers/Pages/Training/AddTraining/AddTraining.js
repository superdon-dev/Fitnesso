import React, { Component } from 'react'
import { Container, Row, Col, Form, FormGroup, FormControl, InputGroup, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import Spinner from '../../../../components/Spinner/Spinner';
import Card from '../../../../components/Card/Card';
import Alert from '../../../../components/Alert/Alert';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'; 
import './AddTraining.css';
import * as actions from '../../../../store/actions/exports';
import icon1 from '../../../../assets/icons/icon1.png';
import icon2 from '../../../../assets/icons/icon2.png';
import icon3 from '../../../../assets/icons/icon3.png';
import icon4 from '../../../../assets/icons/icon4.png';
import icon5 from '../../../../assets/icons/icon5.png';
import icon6 from '../../../../assets/icons/icon6.png';
import icon7 from '../../../../assets/icons/icon7.png';
import icon8 from '../../../../assets/icons/icon8.png';

class AddTraining extends Component {
        state = {
            trainingType: 'Chest',
            intensity: 3,
            controls: {
                practitioner: {
                    elementConfig: {
                        type: 'select',
                        options: [],
                        required: true,
                    },
                    value: '',
                    icon: 'fa fa-user',
                },
                place: {
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Enter place',
                        required: true
                    },
                    value: '',
                    icon: 'fa fa-map-marker-alt',
                },
                dateTime: {
                    elementConfig: {
                        type: 'datetime-local',
                        placeholder: 'Enter Date/Time',
                        default: new Date(),
                        required: true
                    },
                    value: '',
                    icon: 'fa fa-calendar-alt',
                }, 
            },
            message: false,
            loading: false,
        }
    componentDidMount(){
        if(this.props.users){
            this.fillUsers(this.props.users);
        }
        if(this.props.userId){
            this.props.trainingsFetch(this.props.userId, this.props.userType);
        }
    }
    fillUsers = () => {
        let options=[];
        this.props.users.map(user => {
            options.push({"option": user.fullname, "userId": user.userId});
        })
        const updatedUserOptions = {
            ...this.state.controls,
            practitioner: {
                elementConfig: {
                    type: 'select',
                    options: options,
                    required: true,
                },
                value: options[0],
                id: 0,
            },
        }
        this.setState({controls: updatedUserOptions});
    }
    inputChangedHandler = (event, controlName) => {
        const updatedOrderForm = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                id: event.target.selectedIndex
            }
        }
        this.setState({controls: updatedOrderForm});
    }
    submitHandler = (event) => {
        event.preventDefault();
        let training = {
            trainerId: this.props.userId,
            trainerFullname: this.props.userFullname,
            practitionerId: this.props.users[this.state.controls.practitioner.id].userId,
            practitionerFullname: this.props.users[this.state.controls.practitioner.id].fullname,
            trainingType: this.state.trainingType,
            intensity: this.state.intensity,
            place: this.state.controls.place.value,
            dateTime: this.state.controls.dateTime.value,
        }
        this.props.trainingPost(training);
        this.setState({loading: true});
        this.props.trainingsFetch(this.props.userId, this.props.userType);
        setTimeout(
            () => {
                this.setState({loading: false});
                this.setState({message: true});
            }
        , 600)
        setTimeout(
            () => {
                this.setState({message: false});
            }
        , 2000)
    }
    imageClick = (e) => {
        this.setState({trainingType: e.target.alt});
    }
    onSliderChange = (intensity) => {
        this.setState({
            intensity: intensity
        })
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let content=<Spinner />;
        if(this.props.trainings && !this.state.loading){
            content = (                
                this.props.trainings.map(training => {
                    return <Card className="Card" practitioner={training.practitionerFullname} key={training.training} training={training.type} timing={training.time} place={training.place}/>
                })
            )
        }
        if(this.props.empty){
            content = <Alert message={this.props.empty} />
        }
        let form = formElementsArray.map(formElement => {
                switch (formElement.config.elementConfig.type){
                    case 'select':
                        return (
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                        <InputGroup.Text><i className={formElement.config.icon}/></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl 
                                    as="select"
                                    key={formElement.id} 
                                    onChange={(event) => this.inputChangedHandler(event, formElement.id)}>
                                    {formElement.config.elementConfig.options.map((option, index) => (
                                        <option key={index} id={index}>{option.option}</option>
                                    ))}
                                </FormControl>
                            </InputGroup>
                        )
                    default:
                        return ( 
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text><i className={formElement.config.icon}/></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl 
                                    key={formElement.id}
                                    type={formElement.config.elementConfig.type}
                                    placeholder={formElement.config.elementConfig.placeholder}
                                    required={formElement.config.elementConfig.required}
                                    onChange={(event) => this.inputChangedHandler(event, formElement.id)}
                                />
                            </InputGroup>
                        )
                }
            });  
        let trainingIcons = (
            <Row className="TrainingIcon">
                <Col xs={12}> 
                    <Row>
                        <Col xs={3}><img src={icon1} alt="Chest" className={this.state.trainingType === 'Chest' ? 'selected' : null} onClick={(e) => this.imageClick(e)}/></Col>
                        <Col xs={3}><img src={icon2} alt="Back" className={this.state.trainingType === 'Back' ? 'selected' : null} onClick={(e) => this.imageClick(e)} onClick={(e) => this.imageClick(e)}/></Col>
                        <Col xs={3}><img src={icon3} alt="Leg" className={this.state.trainingType === 'Leg' ? 'selected' : null} onClick={(e) => this.imageClick(e)} onClick={(e) => this.imageClick(e)}/></Col>
                        <Col xs={3}><img src={icon4} alt="Arm" className={this.state.trainingType === 'Arm' ? 'selected' : null} onClick={(e) => this.imageClick(e)} onClick={(e) => this.imageClick(e)}/></Col>
                    </Row>
                </Col>
                <Col xs={12}> 
                    <Row>
                        <Col xs={3}><img src={icon5} alt="Abs" className={this.state.trainingType === 'Abs' ? 'selected' : null} onClick={(e) => this.imageClick(e)}/></Col>
                        <Col xs={3}><img src={icon6} alt="Shoulder" className={this.state.trainingType === 'Shoulder' ? 'selected' : null} onClick={(e) => this.imageClick(e)} onClick={(e) => this.imageClick(e)}/></Col>
                        <Col xs={3}><img src={icon7} alt="Cardio" className={this.state.trainingType === 'Cardio' ? 'selected' : null} onClick={(e) => this.imageClick(e)} onClick={(e) => this.imageClick(e)}/></Col>
                        <Col xs={3}><img src={icon8} alt="Hiit" className={this.state.trainingType === 'Hiit' ? 'selected' : null} onClick={(e) => this.imageClick(e)} onClick={(e) => this.imageClick(e)}/></Col>
                    </Row>    
                </Col>
            </Row>
        );
        let intensitySlider = (
            <Slider
                min={1}
                max={5}
                value={this.state.intensity}
                orientation="horizontal"
                onChange={this.onSliderChange}
            />
        )
        return (
            <Container className="AddTraining">
                    <Row>
                        <Col xs={12} md={5} lg={4} className="Column mb-3">
                        <h4>Add Training</h4>
                        <Form onSubmit={this.submitHandler}>
                            <FormGroup>
                                {trainingIcons}
                                {intensitySlider}
                                {form}
                            </FormGroup>
                            <Button className="btn btn-warning btn-block" type="submit">ADD</Button>
                        </Form>
                        </Col>
                        <Col xs={12} md={7} lg={6}>
                        <h4>Trainings</h4>
                            {this.state.message ? 
                            <Alert message="Successfully added training!" />
                            : null}
                            {content}
                        </Col>
                    </Row>
                </Container>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        userFullname: state.user.fullname,
        userType: state.user.userType,
        trainings: state.trainings.trainings,
        empty: state.trainings.empty,
        loading: state.trainings.loading,
        message: state.trainings.message,
        error: state.trainings.error,
        users: state.user.users,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        trainingPost: (training) => dispatch(actions.trainingPost(training)), 
        trainingsFetch: (userId, userType) => dispatch(actions.trainingsFetch(userId, userType)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTraining);
