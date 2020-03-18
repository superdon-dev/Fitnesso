import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/exports';

export class Logout extends Component {
    componentDidMount(){
        this.props.onLogout();
        this.props.trainingsRemove();
    }
    render() {
        return <Redirect to="/" />
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
        trainingsRemove: () => dispatch(actions.trainingsRemove()),
    }
}
export default connect(null, mapDispatchToProps)(Logout)
