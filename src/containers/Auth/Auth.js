import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import './Auth.css';
import * as actions from '../../store/actions/exports';

class Auth extends Component {
        state = {
            controls: {
                fullname: {
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Enter full name',
                        required: true
                    },
                    value: '',
                },  
                email: {
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Enter email',
                        required: true
                    },
                    value: '',
                },
                password: {
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password',
                        required: true
                    },
                    value: '',
                }, 
                gender: {
                    elementConfig: {
                        type: 'select',
                        options: [
                            {gender: "Male"},
                            {gender: "Female"}
                        ]
                    },
                    value: 'Male',
                },
                weight: {
                    elementConfig: {
                        type: 'number',
                        placeholder: 'Your weight',
                        required: true
                    },
                    value: '',
                }, 
                height: {
                    elementConfig: {
                        type: 'number',
                        placeholder: 'Your height',
                        required: true
                    },
                    value: '',
                }, 
                userType: {
                    elementConfig: {
                        type: 'checkbox',
                        options: [
                            {
                                option: "Practitioner", 
                                type:"radio", 
                                name: "userType"
                            },
                            {
                                option: "Trainer", 
                                type: "radio", 
                                name: "userType"
                            }
                        ],
                        value: '',
                    },
                },  
            },
            isSignup: true,
        }
    inputChangedHandler = (event, controlName) => {
        const updatedOrderForm = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value
            }
        }
        this.setState({controls: updatedOrderForm});
    }
    submitHandler = (event) => {
        event.preventDefault();
        let userInfo = {
            email: this.state.controls.email.value,
            fullname: this.state.controls.fullname.value,
            gender: this.state.controls.gender.value,
            weight: this.state.controls.weight.value,
            height: this.state.controls.height.value,
            userType: this.state.controls.userType.value,
        }
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup, userInfo);
    }
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        });
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementsArray.map(formElement => {
                switch (formElement.config.elementConfig.type){
                    case 'select':
                        return (
                            <FormControl 
                                as="select"
                                className="mb-3"
                                key={formElement.id} 
                                onChange={(event) => this.inputChangedHandler(event, formElement.id)}>
                                {formElement.config.elementConfig.options.map((option) => (
                                    <option key={option.gender}>{option.gender}</option>
                                ))}
                            </FormControl>
                        )
                    case 'checkbox':
                        return (
                            <Form.Group 
                            key={formElement.id} 
                            onChange={(event) => this.inputChangedHandler(event, formElement.id)}>
                            {formElement.config.elementConfig.options.map((option) =>  
                                <Form.Check
                                    inline
                                    key={option.option}
                                    label={option.option}
                                    value={option.option}
                                    type={option.type} 
                                />
                            )
                            }
                            </Form.Group>
                        )    
                    default:
                        return ( 
                            <FormControl 
                                className="mb-3"
                                key={formElement.id}
                                type={formElement.config.elementConfig.type}
                                placeholder={formElement.config.elementConfig.placeholder}
                                required={formElement.config.elementConfig.required}
                                onChange={(event) => this.inputChangedHandler(event, formElement.id)}
                            />)
                }
            });
        if(!this.state.isSignup){
            form = form.slice(1, 3);
        }
        if(this.props.loading){
            form = <Spinner />;
        }
        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (
                <p><strong>{this.props.error.message}</strong></p>
            );
        }
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to="/training" />
        }
        return (
            <div className="Auth">
                {authRedirect}
                <h3>{!this.state.isSignup ? 'SignIn' : 'SignUp'}</h3>
                <Form onSubmit={this.submitHandler}>
                    {errorMessage}
                    <FormGroup>
                        {form}
                    </FormGroup>
                    <Button className="btn btn-dark" type="submit">SUBMIT</Button>
                </Form>
                <Button className={this.state.isSignup ? "btn btn-danger mt-2" : "btn btn-warning mt-2"} type="submit" onClick={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup, userInfo) => dispatch(actions.auth(email, password, isSignup, userInfo)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
