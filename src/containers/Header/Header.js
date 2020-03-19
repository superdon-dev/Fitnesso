import React, { Component } from 'react'
import * as actions from '../../store/actions/exports';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import './Header.css';
import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar.png';
export class Header extends Component {
    componentDidMount(){
        this.props.userFetch(this.props.userId);
    }
    render() {
        let content = (
            <div className="Header">
                <div className="Logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="Avatar">
                    <img src={this.props.imageUrl ? this.props.imageUrl : avatar} alt="avatar" />
                </div>
            </div>
        );
        if(this.props.loading){
            content = <Spinner />;
        }
        return (
            <div className="Header">
                {content}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        fullname: state.user.fullname,
        gender: state.user.gender,
        height: state.user.height,
        weight: state.user.weight,
        imageUrl: state.user.imageUrl,
        loading: state.user.loading,
        error: state.user.error,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        userFetch: (userId) => dispatch(actions.userFetch(userId))
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Header)
