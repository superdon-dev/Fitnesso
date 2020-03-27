import React, { Component } from 'react'
import * as actions from '../../store/actions/exports';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import './Header.css';
import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar.png';
export class Header extends Component {
    componentDidMount(){
        this.props.userFetch(this.props.userId, this.props.userType);
        this.props.usersFetch();
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
        return content;
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
        userType: state.user.userType,
        loading: state.user.loading,
        error: state.user.error,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        userFetch: (userId, userType) => dispatch(actions.userFetch(userId, userType)),
        usersFetch: () => dispatch(actions.usersFetch()),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Header)
