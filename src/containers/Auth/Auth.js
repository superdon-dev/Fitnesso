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
            },
            isSignup: false,
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
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
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
        let form= formElementsArray.map(formElement => (
            <FormControl 
                className="mb-3"
                key={formElement.id}
                type={formElement.config.elementConfig.type}
                placeholder={formElement.config.elementConfig.placeholder}
                required={formElement.config.elementConfig.required}
                onChange={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));
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
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
